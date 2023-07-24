import { Company } from 'src/modules/company/entities/company.entity';
import { Town } from 'src/modules/location/entities/town.entity';
import { ProductPdv } from 'src/modules/product/entities/product-pdv.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pdvs')
export class Pdv {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => Town, (town) => town.pdv)
  @JoinColumn({ name: 'location_id' })
  location: Town;

  @Column({ length: 100, unique: true })
  address: string;

  @Column({ name: 'phone_number', length: 100 })
  phoneNumber: string;

  @Column({ type: 'boolean' })
  main: boolean;

  @ManyToOne(() => Company, (company) => company.pdvs)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => ProductPdv, (productPdv) => productPdv.pdvs)
  public productPdv: ProductPdv[];
}
