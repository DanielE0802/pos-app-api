import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/modules/category/entities/category.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { ProductPdv } from '../../products-pdvs/entities/product-pdv.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'bar_code' })
  barCode: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({
    name: 'type_product',
    type: 'int',
    comment: '1: Simple | 2: Config',
  })
  typeProduct: number;

  @Column({ type: 'boolean' })
  state: boolean;

  @Column({ name: 'sell_in_negative', type: 'boolean' })
  sellInNegative: boolean;

  @Column({ name: 'taxes_option', type: 'int' })
  taxesOption: number;

  @Column()
  sku: string;

  @Column({ name: 'price_sale' })
  priceSale: number;

  @Column({ name: 'price_base' })
  priceBase: number;

  // @Column({ name: '' })
  // precio al que lo compro: number;

  @Column({ name: 'quantity_stock' })
  quantityStock: number; // Global stock couting all PDVs

  // TODO: Identify if that product is ConfigProduct or SimpleProduct
  @ManyToOne(() => Product, (Product) => Product.subProducts, {
    nullable: true,
  })
  @JoinColumn({ name: 'product_main_product_id' })
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

  @OneToMany(() => ProductPdv, (productPdv) => productPdv.product)
  public productPdv: ProductPdv[];
}
