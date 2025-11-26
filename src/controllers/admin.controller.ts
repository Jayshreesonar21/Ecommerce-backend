import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';

export class AdminController {
  static async dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const filter =
        (req.query.filter as 'today' | 'thisMonth' | 'lastMonth' | 'thisYear') || 'today';
      const data = await AdminService.getDashboard(filter);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.query.role as 'SELLER' | 'CUSTOMER';
      const data = await AdminService.getUsers(role);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AdminService.getAllProducts();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AdminService.getAllOrders();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}
