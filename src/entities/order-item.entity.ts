import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(() => Product, { onDelete: 'SET NULL' })
  product!: Product;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    transformer: { to: (v) => v, from: (v) => Number(v) },
  })
  price!: number;
}
