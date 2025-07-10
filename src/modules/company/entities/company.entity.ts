import { Category } from 'src/modules/company/entities/category.entity';
import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { User } from 'src/common/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
  Generated,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('companies')
@Index(['nit'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  companyId: string;

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

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'user_id', nullable: true })
  userId: number;
  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Pdv, (pdv) => pdv.company)
  pdvs: Pdv[];

  @OneToMany(() => Category, (category) => category.company)
  categories: Category[];
}
