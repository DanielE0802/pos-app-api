import { Company } from 'src/common/entities/company.entity';
import { Town } from 'src/components/location/entities/town.entity';
import { ProductPdv } from 'src/common/entities/product-pdv.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pdvs')
export class Pdv {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => Town, (town) => town.pdv)
  @JoinColumn({ name: 'location_id' })
  location: Town;

  @Column({ length: 100, unique: true })
  address: string;

  @Column({ name: 'phone_number', length: 100 })
  phoneNumber: string;

  @Column({ type: 'boolean' })
  main: boolean;

  @Column({ name: 'company_id', type: 'varchar', nullable: true })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => ProductPdv, (productPdv) => productPdv.pdv)
  productPdv: ProductPdv[];

  // auto columns
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
