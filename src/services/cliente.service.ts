import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ClienteService {
  // Criar Cliente
  static async createCliente(data: { nome: string; telefone: string; tipo: string }) {
    try {
      const cliente = await prisma.cliente.create({
        data: {
          nome: data.nome,
          telefone: data.telefone,
          tipo: data.tipo === 'fiel' ? 'fiel' : 'aleatorio', // Garantir que o tipo seja fiel ou aleatório
        },
      });
      return cliente;
    } catch (error) {
      throw new Error('Erro ao criar cliente');
    }
  }

  // Listar todos os clientes
  static async listClientes() {
    try {
      const clientes = await prisma.cliente.findMany();
      return clientes;
    } catch (error) {
      throw new Error('Erro ao listar clientes');
    }
  }

  // Buscar Cliente pelo nome
  static async getClienteByNome(nome: string) {
    try {
      const cliente = await prisma.cliente.findFirst({
        where: {
          nome: nome,
        },
      });
      return cliente;
    } catch (error) {
      throw new Error('Erro ao buscar cliente');
    }
  }

  // Atualizar informações de um Cliente
  static async updateCliente(id: string, data: { nome?: string; telefone?: string; tipo?: string }) {
    try {
      const updatedCliente = await prisma.cliente.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nome: data.nome,
          telefone: data.telefone,
          tipo: data.tipo ? (data.tipo === 'fiel' ? 'fiel' : 'aleatorio') : undefined, // Tipo opcional
        },
      });
      return updatedCliente;
    } catch (error) {
      throw new Error('Erro ao atualizar cliente');
    }
  }

  // Excluir Cliente
  static async deleteCliente(id: string) {
    try {
      const deletedCliente = await prisma.cliente.delete({
        where: {
          id: parseInt(id),
        },
      });
      return deletedCliente;
    } catch (error) {
      throw new Error('Erro ao excluir cliente');
    }
  }
}
