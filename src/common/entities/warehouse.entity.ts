import { Company } from 'src/common/entities/company.entity';
import { Town } from 'src/common/entities/town.entity';
import { Stock } from 'src/common/entities/stock';
// import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('warehouses')
export class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true, default: null })
  description?: string;

  @ManyToOne(() => Town, (town) => town.pdv)
  @JoinColumn({ name: 'location_id' })
  location: Town;

  @Column({ length: 100, unique: true })
  address: string;

  @Column({ name: 'phone_number', length: 100 })
  phoneNumber: string;

  @Column({ type: 'boolean' })
  main: boolean;

  @ManyToOne(() => Company, (company) => company.warehouses)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Stock, (stock) => stock.warehouse)
  public stock: Stock[];
}
