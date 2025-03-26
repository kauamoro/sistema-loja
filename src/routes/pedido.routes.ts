import { Router } from 'express';
import { createPedidoController, getPedidosController } from '../controllers/pedido.controller';

const router = Router();

// Definindo as rotas
router.post('/pedidos', createPedidoController); // Rota para criar pedido
router.get('/pedidos', getPedidosController); // Rota para obter pedidos

export default router;
