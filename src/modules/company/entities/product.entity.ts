import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Generated,
} from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { Company } from './company.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: string;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  productId: string;

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

  @Column({ name: 'company_id', type: 'int' })
  companyId: number;

  @Column({ name: 'brand_id', type: 'int' })
  brandId: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  public brand: Brand;

  @ManyToOne(() => Company, (c) => c.id)
  @JoinColumn({ name: 'company_id' })
  public company: Company;
}
