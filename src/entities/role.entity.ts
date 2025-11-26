import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string; // 'ADMIN' | 'SELLER' | 'CUSTOMER'

  @Column({ default: '' })
  description!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
