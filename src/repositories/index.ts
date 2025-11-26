import { AppDataSource } from '../config/typeorm';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Role } from '../entities/role.entity';
import { Category } from '../entities/category.entity';
import { Order } from '../entities/order.entity';
import { Cart } from '../entities/cart.entity';
import { OrderItem } from '../entities/order-item.entity';

export const UserRepo = () => AppDataSource.getRepository(User);
export const ProductRepo = () => AppDataSource.getRepository(Product);
export const RoleRepo = () => AppDataSource.getRepository(Role);
export const CategoryRepo = () => AppDataSource.getRepository(Category);
export const OrderRepo = () => AppDataSource.getRepository(Order);
export const CartRepo = () => AppDataSource.getRepository(Cart);
export const OrderItemRepo = () => AppDataSource.getRepository(OrderItem);
