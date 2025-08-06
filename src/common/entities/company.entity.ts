import { Category } from 'src/common/entities/category.entity';
import { Warehouse } from 'src/common/entities/warehouse.entity';
import { User } from 'src/common/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Brand } from './brand.entity';

@Entity('companies')
@Index(['nit'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'nit' })
  nit: string;

  @Column({ name: 'address', length: 50 })
  address: string;

  @Column({ name: 'phone_number', length: 20 })
  phoneNumber: string;

  @Column({ name: 'website' })
  website: string;

  @Column({ name: 'quantity_employees' })
  quantityEmployees: string;

  @Column({ name: 'economic_activity' })
  economicActivity: string;

  @Column({ name: 'user_id', nullable: true })
  userId: number;
  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Warehouse, (warehouse) => warehouse.company)
  warehouses: Warehouse[];

  @OneToMany(() => Category, (category) => category.company)
  categories: Category[];

  @OneToMany(() => Brand, (brand) => brand.company)
  brands: Brand[];
}
