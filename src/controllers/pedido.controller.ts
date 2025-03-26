import { Request, Response } from 'express';
import { createPedido, getPedidos } from '../services/pedido.service';
import { MetodoPagamento } from '@prisma/client';

// Função para criar um pedido com seus produtos
export const createPedidoController = async (req: Request, res: Response) => {
  const { clienteId, produtos, valorTotal, metodoPagamento } = req.body;

  // Validações
  if (!clienteId || !produtos || !valorTotal || !metodoPagamento) {
    return res.status(400).json({ message: 'Faltando dados obrigatórios!' });
  }

  // Valida se o metodoPagamento é válido
  if (!Object.values(MetodoPagamento).includes(metodoPagamento as MetodoPagamento)) {
    return res.status(400).json({ message: 'Método de pagamento inválido!' });
  }

  try {
    // Chama a função de criação do pedido no serviço
    const pedido = await createPedido(clienteId, produtos, valorTotal, metodoPagamento);
    res.status(201).json(pedido); // Retorna o pedido criado com status 201 (Criado)
  } catch (error) {
    console.error(error);

    // Verifica se o erro é uma instância de Error
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erro ao criar pedido', error: error.message });
    } else {
      // Caso o erro não seja uma instância de Error, retorna um erro genérico
      return res.status(500).json({ message: 'Erro desconhecido ao criar pedido' });
    }
  }
};

// Função para listar todos os pedidos com seus produtos
export const getPedidosController = async (req: Request, res: Response) => {
  try {
    const pedidos = await getPedidos(); // Chama a função de busca de pedidos no serviço
    res.status(200).json(pedidos); // Retorna os pedidos com status 200 (OK)
  } catch (error) {
    console.error(error);

    // Verifica se o erro é uma instância de Error
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erro ao obter pedidos', error: error.message });
    } else {
      // Caso o erro não seja uma instância de Error, retorna um erro genérico
      return res.status(500).json({ message: 'Erro desconhecido ao obter pedidos' });
    }
  }
};
