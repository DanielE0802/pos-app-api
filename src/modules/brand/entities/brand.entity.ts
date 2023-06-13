import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  // TODO: Add pending properties

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
