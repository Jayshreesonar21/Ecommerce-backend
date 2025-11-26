import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    transformer: { to: (v) => v, from: (v) => Number(v) },
  })
  price!: number;

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column({ nullable: true })
  imageUrl!: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  seller!: User;

  @ManyToOne(() => Category, (c) => c.products, { eager: true })
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
