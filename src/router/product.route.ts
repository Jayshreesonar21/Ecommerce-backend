import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { upload } from '../utils/multer';
import {
  productCreateSchema,
  productUpdateSchema,
  productListQuerySchema,
  productIdParamSchema,
} from '../validators/product.validator';
import { ROLE } from '../constants';

const router = Router();

// Seller create product
router.post(
  '/',
  authMiddleware,
  roleMiddleware(ROLE.SELLER),
  upload.single('image'),
  validate(productCreateSchema),
  ProductController.create,
);

// Seller update product
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(ROLE.SELLER),
  validate(productIdParamSchema, 'params'),
  validate(productUpdateSchema),
  ProductController.update,
);

// Seller delete product
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(ROLE.SELLER),
  validate(productIdParamSchema, 'params'),
  ProductController.delete,
);

// Seller list own products
router.get(
  '/my-products',
  authMiddleware,
  roleMiddleware(ROLE.SELLER),
  ProductController.myProducts,
);

// Public product list
router.get('/', validate(productListQuerySchema, 'query'), ProductController.list);

export default router;
