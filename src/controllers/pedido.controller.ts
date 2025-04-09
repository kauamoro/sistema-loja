import { Request, Response } from 'express';
import { PedidoService } from '../services/pedido.service';

class PedidoController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const pedido = await PedidoService.createPedido(data);

            return res.status(200).json({ pedido })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    }
    
    
}

export { PedidoController }