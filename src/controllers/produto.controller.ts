import { Request, Response } from 'express';
import { ProdutoService } from '../services/produto.service';

class ProdutoController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, descricao, preco, estoque } = req.body

            const produto = await ProdutoService.createProduto({ nome, preco, estoque,  descricao });
            return res.status(201).json(produto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Erro interno do servidor.' });
        }
    }

    static async list(req: Request, res: Response): Promise<Response> {
        try {
            const produtos = await ProdutoService.listProdutos();
            return res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Erro interno do servidor.' });
        }
    }

    //api.com/produtos/tapete
    static async getByNome(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.params;

            if (!nome) {
                return res.status(404).json({message: 'Produto não encontrado!'})
            }

            const produto = await ProdutoService.getProdutosByName(nome);
            return res.status(200).json(produto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Erro interno do servidor.' });
        }
    }

    static async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const { nome, preco, estoque, descricao } = req.body

            if (!nome && preco === undefined && estoque === undefined && descricao === undefined) {
                return res.status(400).json({ message: 'Envie ao menos um campo para atualização.' });
            }
            
            const produto = await ProdutoService.updateProduto( Number(id), { nome, preco, descricao, estoque})
            
            return res.status(200).json(produto)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar produto.' });
        }
    }

    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            if(!id){
                return res.status(404).json({ message: 'O produto nao foi encontrado!' })
            }
            const produto = await ProdutoService.deleteProduto(id);

            return res.status(200).json(produto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao excluir produto.' });
        }
    }
}

export { ProdutoController }