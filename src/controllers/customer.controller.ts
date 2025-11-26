import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
  static async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = String(req.user!.id);
      const result = await CustomerService.addToCart(userId, req.body);

      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = String(req.user!.id);
      const result = await CustomerService.getCart(userId);

      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  static async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = String(req.user!.id);
      await CustomerService.removeCartItem(userId, req.params.id);

      res.json({ success: true, message: 'Item removed' });
    } catch (err) {
      next(err);
    }
  }

  static async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = String(req.user!.id);
      const order = await CustomerService.checkout(userId);

      res.json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  }

  static async orderHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = String(req.user!.id);
      const result = await CustomerService.orderHistory(userId);

      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
}
