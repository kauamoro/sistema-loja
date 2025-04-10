import { Request, Response } from "express";
import { ParcelaService } from "../services/parcela.service";

export class ParcelaController{
    static async create(req: Request, res: Response) {
        try {
            const { pedidoId, valorTotal, quantidadeParcelas } = req.body;

            if (!pedidoId || !valorTotal || !quantidadeParcelas) {
            return res.status(400).json({ message: "Campos obrigatórios: pedidoId, valorTotal,  quantidadeParcelas" });
            }

            const parcelas = await ParcelaService.criarParcelas({pedidoId, valorTotal, quantidadeParcelas})
            return res.status(200).json({ message: "Parcelas criadas com sucesso!", parcelas })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Erro interno do servidor.' });
        }
    }
}