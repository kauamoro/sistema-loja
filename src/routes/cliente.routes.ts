//@ts-nocheck
import { Router } from 'express';
import ClienteController from '../controllers/cliente.controller';

const router = Router();

router.post('/', ClienteController.create);
router.get('/', ClienteController.list);
router.get('/:nome', ClienteController.getByNome);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);

export { router };
