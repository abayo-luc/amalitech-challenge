import ProductController from './product.controller';
import { Router } from 'express';

const router = Router();

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
