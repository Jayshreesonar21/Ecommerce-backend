import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { CustomerController } from '../controllers/customer.controller';
import { validate } from '../middlewares/validate.middleware';
import { cartAddSchema } from '../validators/cart.validator';
import { ROLE } from '../constants';

const router = Router();

// Add to cart
router.post(
  '/cart',
  authMiddleware,
  roleMiddleware(ROLE.CUSTOMER),
  validate(cartAddSchema),
  CustomerController.addToCart,
);

// Get cart
router.get('/cart', authMiddleware, roleMiddleware(ROLE.CUSTOMER), CustomerController.getCart);

// Remove from cart
router.delete(
  '/cart/:id',
  authMiddleware,
  roleMiddleware(ROLE.CUSTOMER),
  CustomerController.removeFromCart,
);

// Checkout
router.post(
  '/cart/checkout',
  authMiddleware,
  roleMiddleware(ROLE.CUSTOMER),
  CustomerController.checkout,
);

// Purchase history
router.get(
  '/orders/my',
  authMiddleware,
  roleMiddleware(ROLE.CUSTOMER),
  CustomerController.orderHistory,
);

export default router;
