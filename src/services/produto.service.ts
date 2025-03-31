    import { PrismaClient, TipoCliente } from "@prisma/client";

    const prisma = new PrismaClient();

    export class ProdutoService {
        static async createProduto(data: {nome: string, descricao: string, preco: number, estoque: number }) {
            try {
                return await prisma.produto.create({
                    data: {
                        nome: data.nome,
                        descricao: data.descricao,
                        preco: data.preco,
                        estoque: data.estoque
                    }
                })
            } catch (error) {
                console.error(error);
                throw new Error(`Erro ao criar produto: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
            }
        }

        static async listProdutos() {
            try {
                return await prisma.produto.findMany();
            } catch (error) {
                throw new Error(`Erro ao listar produtos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
            }
        }

        static async getProdutosByName(nome: string) {
            try {
                return await prisma.produto.findMany({ where: { nome } });
            } catch (error) {
                throw new Error(`Erro ao achar produto: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
            }
        }

        static async updateProduto(id: number, data: { nome?: string, descricao?: string; preco?: number, estoque?: number }) {
            try {
                const produtoExiste = await prisma.produto.findUnique({ where: { id } });
                if (!produtoExiste) throw new Error('Produto não encontrado.');

                return await prisma.produto.update({
                    where: { id },
                    data: {
                        nome: data.nome,
                        descricao: data.descricao,
                        preco: data.preco,
                        estoque: data.estoque
                    }
                });
            } catch (error) {
                throw new Error(`Erro ao atualizar produto: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
            }
        }

        static async deleteProduto(id: number) {
            try {
                const produtoExiste = await prisma.produto.findUnique({ where: { id } });
                if (!produtoExiste) throw new Error('Produto não encontrado.');

                return await prisma.produto.delete({where:{ id } });
            } catch (error) {
                throw new Error(`Erro ao deletar produto: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
            }
        }
    }