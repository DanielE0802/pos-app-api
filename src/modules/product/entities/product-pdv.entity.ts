import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_pdv')
export class ProductPdv {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  quantity: number;

  @Column({ name: 'min_quantity' })
  minQuantity: number;

  @ManyToOne(() => Product, (product) => product.productPdv)
  @JoinColumn({ name: 'products_id' })
  public products: Product;

  @ManyToOne(() => Pdv, (pdv) => pdv.productPdv)
  @JoinColumn({ name: 'pdvs_id' })
  public pdvs: Pdv;
}
