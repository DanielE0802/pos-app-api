import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Warehouse } from 'src/common/entities/warehouse.entity';
import { Product } from 'src/common/entities/product.entity';
import { BaseEntity } from './base.entity';

@Entity('stocks')
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity', type: 'int', default: 0 })
  quantity: number;

  @Column({ name: 'min_quantity', type: 'int', default: 0 })
  minQuantity: number;

  @Column({ name: 'product_id', type: 'int' })
  productId: number;
  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  public product: Product;

  @Column({ name: 'warehouse_id', type: 'int' })
  warehouseId: number;
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stock)
  @JoinColumn({ name: 'warehouse_id' })
  public warehouse: Warehouse;
}
