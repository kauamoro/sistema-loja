import { PrismaClient, MetodoPagamento } from "@prisma/client";

const prisma = new PrismaClient();

export class PedidoService {
    static async createPedido(data: { clienteId?: number, produtos: { produtoId: number, quantidade: number }[], metodoPagamento: string }) {
        try {
            // 1️⃣ Verificar se os produtos existem e possuem estoque suficiente
            const produtosComprados = await prisma.produto.findMany({   
                //O 'p' é os produto que estao dentro do objeto produtos que foi passado nos parametros da funcao createPedido
                //Essa seta => serve para dizer que, queremos pegar o id de todos os produtos dentro do objeto produtos

                where: {
                    id: { in: data.produtos.map(p => p.produtoId) }
                }
            });

            if (produtosComprados.length !== data.produtos.length) {
                throw new Error("Um ou mais produtos não existem.");
            }

            for (const item of data.produtos) {
                const produto = produtosComprados.find(p => p.id === item.produtoId);
                if (!produto || produto.estoque < item.quantidade) {
                    throw new Error(`Estoque insuficiente para o produto ID ${item.produtoId}.`);
                }
            }

            // 2️⃣ Calcular o valor total do pedido
            const valorTotal = data.produtos.reduce((total, item) => {
                // esse codigo abaixo vai rodar para cada item dentro de data.produtos. ele vai armazenar em produto o produto dujo os ids sao compativeis. no caso a constante produto vai mudar de valor a cada item q o reduce percorrer.
                const produto = produtosComprados.find(p => p.id === item.produtoId);
                return total + (produto!.preco * item.quantidade);
            }, 0);

            // 3️⃣ Criar o pedido
            const pedido = await prisma.pedido.create({
                data: {
                    clienteId: data.clienteId || null,
                    valorTotal,
                    metodoPagamento: data.metodoPagamento as MetodoPagamento
                }
            });

            // 4️⃣ Registrar os produtos comprados no PedidoProduto
            const pedidoProdutos = data.produtos.map(item => {
            const produto = produtosComprados.find(p => p.id === item.produtoId);

                return {
                    pedidoId: pedido.id,
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    precoUnitario: produto!.preco  // Adicionando o preço do produto atual
                };
            });

            await prisma.pedidoProduto.createMany({ data: pedidoProdutos });


            // 5️⃣ Atualizar o estoque dos produtos
            for (const item of data.produtos) {
                await prisma.produto.update({
                    where: { id: item.produtoId },
                    data: { estoque: { decrement: item.quantidade } }
                });
            }

            // 6️⃣ Criar parcelas (caso o pagamento seja parcelado)
            if (data.metodoPagamento === "parcelado") {
                // Defina aqui a lógica de parcelamento
            }

            return pedido;
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao criar pedido: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
    }
}
