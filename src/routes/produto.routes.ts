//@ts-nocheck
import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";

const router = Router();

router.post('/', ProdutoController.create);
router.get('/', ProdutoController.list);
router.get('/:nome', ProdutoController.getByNome);
router.put('/:id', ProdutoController.update);
router.delete('/:id', ProdutoController.delete);

export { router };