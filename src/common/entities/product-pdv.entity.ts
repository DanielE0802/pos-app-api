import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pdv } from 'src/common/entities/pdv.entity';
import { Product } from './product.entity';

@Entity('products_pdvs')
export class ProductPdv {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column({ name: 'min_quantity' })
  minQuantity: number;

  // Relations
  @Column({ name: 'product_id', type: 'varchar', nullable: true })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'pdv_id', type: 'varchar', nullable: true })
  pdvId: string;

  @ManyToOne(() => Pdv)
  @JoinColumn({ name: 'pdv_id' })
  pdv: Pdv;

  // auto columns
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
