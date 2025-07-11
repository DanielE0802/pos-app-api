import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { Company } from './company.entity';
import { BaseEntity } from './base.entity';

export enum ProductType {
  SIMPLE = 1,
  CONFIG = 2,
}

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 55 })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'bar_code', nullable: false })
  barCode: string;

  @Column('simple-array', { nullable: true, default: [] })
  images?: string[];

  @Column({
    name: 'type_product',
    type: 'enum',
    enum: ProductType,
    comment: '1: Simple | 2: Config',
    default: ProductType.SIMPLE,
  })
  typeProduct: ProductType;

  // @Column({ name: 'sell_in_negative', type: 'boolean' })
  // sellInNegative: boolean;

  @Column({ name: 'taxes_option', type: 'int' })
  taxesOption: number;

  @Column({ name: 'sku', nullable: true, default: null })
  sku?: string;

  @Column({ name: 'price_sale', nullable: false })
  priceSale: number;

  @Column({ name: 'price_base' })
  priceBase: number;

  // @Column({ name: 'quantity_stock' })
  // quantityStock: number; // Global stock couting all PDVs

  // TODO: Identify if that product is ConfigProduct or SimpleProduct

  // @ManyToOne(() => Product, (Product) => Product.subProducts, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'product_main_product_id' })
  // productMainProduct: Product;

  // @OneToMany(() => Product, (Product) => Product.productMainProduct, {
  //   nullable: true,
  // })
  // subProducts: Product[];

  @Column({ name: 'company_id' })
  companyId: string;
  @ManyToOne(() => Company, (c) => c.id)
  @JoinColumn({ name: 'company_id' })
  public company: Company;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: string;
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @Column({ name: 'brand_id', type: 'int' })
  brandId: string;
  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  public brand: Brand;
}
