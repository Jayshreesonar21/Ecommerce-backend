import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './index';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Cart } from '../entities/cart.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: false, // false in prod; use migrations
  logging: false,
  poolSize: 10,
  extra: {
    connectLimit: 10,
    idleTimeout: 30000,
    connectTimeout: 10000,
  },
  entities: [User, Role, Product, Category, Order, OrderItem, Cart],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
