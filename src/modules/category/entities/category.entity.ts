import { Company } from 'src/modules/company/entities/company.entity';
import { Product } from 'src/modules/product/entities/product.entity';
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

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: 'category_main_category_id' })
  categoryMainCategory: Category;

  @OneToMany(() => Category, (category) => category.categoryMainCategory)
  subcategories: Category[];

  @ManyToOne(() => Company, (company) => company.categories)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
