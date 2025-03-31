import { PrismaClient, TipoCliente } from '@prisma/client';


const prisma = new PrismaClient();

export class ClienteService {
    static async createCliente(data: { nome: string; telefone: string; tipo: string }) {
        try {
            return await prisma.cliente.create({
                data: {
                    nome: data.nome,
                    telefone: data.telefone,
                    tipo: data.tipo as TipoCliente,
                },
            });
        } catch (error) {
            throw new Error('Erro ao criar cliente');
        }
    }

    static async listClientes() {
        try {
            return await prisma.cliente.findMany();
        } catch (error) {
            throw new Error('Erro ao listar clientes');
        }
    }

    static async getClienteByNome(nome: string) {
        try {
            return await prisma.cliente.findFirst({ where: { nome } });
        } catch (error) {
            throw new Error('Erro ao buscar cliente');
        }
    }

    static async updateCliente(id: number, data: { nome?: string; telefone?: string; tipo?: string }) {
        try {
            const clienteExiste = await prisma.cliente.findUnique({ where: { id } });
            if (!clienteExiste) throw new Error('Cliente não encontrado.');

            return await prisma.cliente.update({
                where: { id },
                data: {
                    nome: data.nome,
                    telefone: data.telefone,
                    tipo: data.tipo ? (data.tipo as TipoCliente) : undefined,
                },
            });
        } catch (error) {
            throw new Error('Erro ao atualizar cliente');
        }
    }

    static async deleteCliente(id: number) {
        try {
            const clienteExiste = await prisma.cliente.findUnique({ where: { id } });
            if (!clienteExiste) throw new Error('Cliente não encontrado.');

            return await prisma.cliente.delete({ where: { id } });
        } catch (error) {
            throw new Error('Erro ao excluir cliente');
        }
    }
}
