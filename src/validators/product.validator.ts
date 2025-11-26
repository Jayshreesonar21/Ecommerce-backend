import Joi from 'joi';

// CREATE PRODUCT
export const productCreateSchema = Joi.object({
  name: Joi.string().min(3).max(150).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().precision(2).required(),
  stock: Joi.number().integer().min(0).required(),
  categoryId: Joi.string().uuid().required(),
});

// UPDATE PRODUCT
export const productUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(150).optional(),
  description: Joi.string().min(10).optional(),
  price: Joi.number().precision(2).optional(),
  stock: Joi.number().integer().min(0).optional(),
  categoryId: Joi.string().uuid().optional(),
  imageUrl: Joi.string().uri().optional(),
}).min(1); // at least one field required

// LIST PRODUCTS (public)
export const productListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).max(100).optional().default(20),
  category: Joi.string().optional(),
  search: Joi.string().optional(),
});

// DELETE PRODUCT
export const productDeleteSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

// GET PRODUCT BY ID
export const productIdParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
