import { Category } from 'src/common/entities/category.entity';
import { Pdv } from 'src/common/entities/pdv.entity';
import { User } from 'src/common/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  nit: string;

  @Column({ length: 50 })
  address: string;

  @Column({ name: 'phone_number', length: 20 })
  phoneNumber: string;

  @Column()
  website: string;

  @Column({ name: 'quantity_employees' })
  quantityEmployees: string;

  @Column({ name: 'economic_activity' })
  economicActivity: string;

  // Relations
  @Column({ name: 'user_id', type: 'varchar', nullable: true })
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Pdv, (pdv) => pdv.company)
  pdvs: Pdv[];

  @OneToMany(() => Category, (category) => category.company)
  categories: Category[];
}