import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_pdv')
export class ProductPdv {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  quantity: number;

  @Column()
  minQuantity: number;

  @ManyToOne(() => Product, (product) => product.productPdv)
  public products: Product;

  @ManyToOne(() => Pdv, (pdv) => pdv.productPdv)
  public pdvs: Pdv;
}
