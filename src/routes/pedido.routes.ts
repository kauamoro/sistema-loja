//@ts-nocheck
import { Router } from "express";
import { PedidoController } from "../controllers/pedido.controller";

const router = Router();

router.post('/', PedidoController.create);

export { router }