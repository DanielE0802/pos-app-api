import { Company } from 'src/common/entities/company.entity';
import { Product } from 'src/common/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('brands')
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'description', length: 255, nullable: true, default: null })
  description?: string;

  // TODO: Add pending properties

  @Column({ name: 'company_id' })
  companyId: string;
  @ManyToOne(() => Company, (company) => company.brands)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
