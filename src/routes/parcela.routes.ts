//@ts-nocheck
import { Router } from "express";
import { ParcelaController } from "../controllers/parcela.controller";

const router = Router();

router.post('/', ParcelaController.create);

export { router }