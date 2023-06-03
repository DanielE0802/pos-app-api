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
  @JoinColumn({ name: 'categoryMainCategory_id' })
  categoryMainCategory: Category;

  @OneToMany(() => Category, (category) => category.categoryMainCategory)
  subcategories: Category[];
}
