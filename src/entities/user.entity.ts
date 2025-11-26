import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Role } from './role.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role!: Role;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Cart, (cart) => cart.user)
  cartItems!: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
