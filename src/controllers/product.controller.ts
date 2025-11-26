import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { uploadToS3 } from '../utils/s3-upload';

export class ProductController {
  // CREATE PRODUCT
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      let imageUrl = null;

      if (req.file) {
        imageUrl = await uploadToS3(req.file.buffer, req.file.mimetype);
      }

      const product = await ProductService.createProduct({
        ...req.body,
        seller: req.user!,
        imageUrl,
      });

      res.status(201).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }

  // UPDATE PRODUCT
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = req.user!.id;
      const productId = req.params.id;

      const updated = await ProductService.updateProduct(sellerId, productId, req.body);

      res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }

  // DELETE PRODUCT
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = req.user!.id;
      const productId = req.params.id;

      await ProductService.deleteProduct(sellerId, productId);

      res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // LIST ALL PRODUCTS PUBLIC
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, category, search } = req.query;

      const result = await ProductService.listProducts({
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        category: String(category || ''),
        search: String(search || ''),
      });

      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  // LIST ONLY SELLER'S PRODUCTS
  static async myProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = req.user!.id;

      const result = await ProductService.getSellerProducts(sellerId);

      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
