import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from 'src/modules/category/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  barCode: string;

  @Column()
  sku: string;

  @Column()
  priceSale: number;

  @Column()
  brand: string;

  /**
   * TODO: Identify if that product is ConfigProduct or SimpleProduct
   */
  @ManyToOne(() => Product, (Product) => Product.subProducts, {
    nullable: true,
  })
  productMainProduct: Product;

  @OneToMany(() => Product, (Product) => Product.productMainProduct, {
    nullable: true,
  })
  subProducts: Product[];

  @Column()
  quantityStock: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
