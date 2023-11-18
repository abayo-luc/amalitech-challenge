import { Router } from 'express';
import user from './user';
import product from './product';
import order from './Order';

const router = Router();

router.use('/users', user);
router.use('/products', product);
router.use('/orders', order);

export default router;
