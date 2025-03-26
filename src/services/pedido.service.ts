import { prisma } from '../prisma';
import { MetodoPagamento } from '@prisma/client'; // Importa o enum correto

// Função para criar um pedido com produtos
export const createPedido = async (
  clienteId: number,
  produtos: { produtoId: number; quantidade: number }[],
  valorTotal: number,
  metodoPagamento: string
) => {
  // Transação para garantir consistência nos dados
  const transaction = await prisma.$transaction(async (prisma) => {
    // Mapeia os produtos para pegar o preço de cada um
    const produtosComPreco = await Promise.all(
      produtos.map(async (produto) => {
        const produtoBanco = await prisma.produto.findUnique({
          where: { id: produto.produtoId },
          select: { preco: true }, // Seleciona o preço do produto
        });

        if (!produtoBanco) {
          throw new Error(`Produto com ID ${produto.produtoId} não encontrado`);
        }

        return {
          produtoId: produto.produtoId,
          quantidade: produto.quantidade,
          precoUnitario: produtoBanco.preco,
        };
      })
    );

    // Cria o pedido
    const pedido = await prisma.pedido.create({
      data: {
        clienteId,
        valorTotal,
        metodoPagamento: MetodoPagamento[metodoPagamento as keyof typeof MetodoPagamento], // Corrige o tipo de metodoPagamento
        pedidoProdutos: {
          create: produtosComPreco, // Passa os produtos com o preço preenchido
        },
      },
    });

    // Atualiza o estoque dos produtos
    for (const produto of produtos) {
      await prisma.produto.update({
        where: { id: produto.produtoId },
        data: { estoque: { decrement: produto.quantidade } }, // Reduz o estoque
      });
    }

    return pedido;
  });

  return transaction;
};

// Função para obter todos os pedidos com seus produtos
export const getPedidos = async () => {
  return await prisma.pedido.findMany({
    include: {
      pedidoProdutos: {
        include: {
          produto: true, // Inclui as informações do produto
        },
      },
    },
  });
};
