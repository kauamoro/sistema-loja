import { Request, Response } from 'express';
import { ClienteService } from '../services/cliente.service'; // Importa os serviços

class ClienteController {

    // Criar Cliente
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, telefone, tipo } = req.body;

            // Verifica se o tipo de cliente é válido
            if (!['fiel', 'aleatorio'].includes(tipo)) {
                return res.status(400).json({ message: "Tipo de cliente inválido. Use 'fiel' ou 'aleatorio'." });
            }

            const cliente = await ClienteService.createCliente({ nome, telefone, tipo });
            return res.status(201).json(cliente);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    // Listar todos os clientes
    static async list(req: Request, res: Response): Promise<Response> {
        try {
            const clientes = await ClienteService.listClientes();
            return res.status(200).json(clientes);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    // Buscar Cliente pelo nome
    static async getByNome(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.params;
            const cliente = await ClienteService.getClienteByNome(nome);

            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            return res.status(200).json(cliente);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    // Atualizar Cliente
    static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { nome, telefone, tipo } = req.body;

            // Verifica se o tipo de cliente é válido
            if (tipo && !['fiel', 'aleatorio'].includes(tipo)) {
                return res.status(400).json({ message: "Tipo de cliente inválido. Use 'fiel' ou 'aleatorio'." });
            }

            const clienteAtualizado = await ClienteService.updateCliente(id, { nome, telefone, tipo });
            if (!clienteAtualizado) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            return res.status(200).json({ message: 'Cliente atualizado com sucesso.', data: clienteAtualizado });
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'Erro ao atualizar cliente.' });
        }
    }

    // Excluir Cliente
    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const result = await ClienteService.deleteCliente(id);

            if (!result) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            return res.status(200).json({ message: 'Cliente excluído com sucesso.' });
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
            return res.status(404).json({ message: 'Erro ao excluir cliente.' });
        }
    }
}

export default ClienteController;
