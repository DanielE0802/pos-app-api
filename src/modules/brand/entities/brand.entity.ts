import { Company } from 'src/modules/company/entities/company.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  // TODO: Add pending properties

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @ManyToOne(() => Company, (company) => company.categories)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
