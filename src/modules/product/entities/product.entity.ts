import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Category } from 'src/modules/category/entities/category.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { ProductPdv } from './product-pdv.entity';

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

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ type: 'int' })
  typeProduct: number;

  @Column({ type: 'boolean' })
  state: boolean;

  @Column({ type: 'boolean' })
  sellInNegative: boolean;

  @Column({ type: 'int' })
  taxesOption: number;

  @Column()
  sku: string;

  @Column()
  priceSale: number;

  @Column()
  priceBase: number;

  @Column()
  quantityStock: number; // Global stock couting all PDVs

  // TODO: Identify if that product is ConfigProduct or SimpleProduct
  @ManyToOne(() => Product, (Product) => Product.subProducts, {
    nullable: true,
  })
  @JoinColumn({ name: 'productMainProduct_id' })
  productMainProduct: Product;

  @OneToMany(() => Product, (Product) => Product.productMainProduct, {
    nullable: true,
  })
  subProducts: Product[];

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => ProductPdv, (productPdv) => productPdv.products)
  public productPdv: ProductPdv[];
}
