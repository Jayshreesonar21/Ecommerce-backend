import { DASHBOARD_FILTERS, ROLE } from '../constants';
import { UserRepo, ProductRepo, OrderRepo, OrderItemRepo } from '../repositories';
import { Between, MoreThan } from 'typeorm';

export class AdminService {
  // DASHBOARD STATS
  static async getDashboard(filter: (typeof DASHBOARD_FILTERS)[number]) {
    const orderRepo = OrderRepo();
    const productRepo = ProductRepo();
    const userRepo = UserRepo();

    let startDate: Date;
    let endDate: Date = new Date();

    const now = new Date();

    switch (filter) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0); // last day of prev month
        break;
      case 'thisYear':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0); // fallback all-time
    }

    // Total Sales
    const orders = await orderRepo.find({
      where: { createdAt: Between(startDate, endDate) },
      relations: ['items', 'items.product'],
    });

    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);

    // Total Customers
    const totalCustomers = await userRepo.count({ where: { role: { name: ROLE.CUSTOMER } } });

    // Total Products
    const totalProducts = await productRepo.count();

    // Top Selling Products
    const orderItemRepo = OrderItemRepo();

    const topProducts = await orderItemRepo
      .createQueryBuilder('oi')
      .leftJoinAndSelect('oi.product', 'product')
      .select('product.id', 'id')
      .addSelect('product.name', 'name')
      .addSelect('SUM(oi.quantity)', 'totalSold')
      .addSelect('product.price', 'price')
      .groupBy('product.id')
      .orderBy('"totalSold"', 'DESC')
      .limit(5)
      .getRawMany();

    return {
      totalRevenue,
      totalCustomers,
      totalProducts,
      topProducts,
    };
  }

  // GET ALL USERS BY ROLE
  static async getUsers(role: 'SELLER' | 'CUSTOMER') {
    const userRepo = UserRepo();
    return await userRepo.find({
      where: { role: { name: role } },
      order: { createdAt: 'DESC' },
    });
  }

  // GET ALL PRODUCTS
  static async getAllProducts() {
    const productRepo = ProductRepo();
    return await productRepo.find({
      relations: ['seller', 'category'],
      order: { createdAt: 'DESC' },
    });
  }

  // GET ALL TRANSACTIONS (Orders)
  static async getAllOrders() {
    const orderRepo = OrderRepo();
    return await orderRepo.find({
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }
}
