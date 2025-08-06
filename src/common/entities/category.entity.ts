import { Company } from 'src/common/entities/company.entity';
import { Product } from 'src/common/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ length: 255, nullable: true, default: null })
  description?: string;

  // @ManyToOne(() => Category, (category) => category.subcategories)
  // @JoinColumn({ name: 'category_main_category_id' })
  // categoryMainCategory: Category;

  @Column({ name: 'company_id' })
  companyId: string;
  @ManyToOne(() => Company, (company) => company.categories)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  // @OneToMany(() => Category, (category) => category.categoryMainCategory)
  // subcategories: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
