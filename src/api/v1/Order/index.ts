import OrderController from './order.controller';
import { Router } from 'express';

const router = Router();

router.get('/', OrderController.getAll);
router.get('/:id', OrderController.getOne);
router.post('/', OrderController.create);
// router.put('/:id', OrderController.update);
// router.delete('/:id', OrderController.delete);

export default router;
