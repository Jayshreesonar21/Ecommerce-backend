import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { ROLE } from '../constants';

const router = Router();

// Dashboard stats
router.get('/dashboard', authMiddleware, roleMiddleware(ROLE.ADMIN), AdminController.dashboard);

// Get all users by role
router.get('/users', authMiddleware, roleMiddleware(ROLE.ADMIN), AdminController.getUsers);

// Get all products
router.get('/products', authMiddleware, roleMiddleware(ROLE.ADMIN), AdminController.getAllProducts);

// Get all orders
router.get('/orders', authMiddleware, roleMiddleware(ROLE.ADMIN), AdminController.getAllOrders);

export default router;
