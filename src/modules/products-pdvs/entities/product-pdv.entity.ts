import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('products_pdvs')
export class ProductPdv {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  quantity: number;

  @Column({ name: 'min_quantity' })
  minQuantity: number;

  @ManyToOne(() => Product, (product) => product.productPdv)
  @JoinColumn({ name: 'products_id' })
  public product: Product;

  @ManyToOne(() => Pdv, (pdv) => pdv.productPdv)
  @JoinColumn({ name: 'pdvs_id' })
  public pdv: Pdv;
}
