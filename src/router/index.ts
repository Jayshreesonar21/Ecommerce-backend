import { Router } from 'express';
import productRouter from './product.route';
import authRouter from './auth.route';
import customerRouter from './customer.route';
import adminRouter from './admin.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/customer', customerRouter);
router.use('/admin', adminRouter);

export default router;
