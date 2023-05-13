import { Product } from 'src/modules/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.subcategories)
  categoryMainCategory: Category;

  @OneToMany(() => Category, (category) => category.categoryMainCategory)
  subcategories: Category[];
}
