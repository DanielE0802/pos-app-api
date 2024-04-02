import { Category } from 'src/modules/category/entities/category.entity';
import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { Profile } from 'src/modules/user/entities/profile.entity';
import { User } from 'src/modules/user/entities/user.entity';
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

  @Column({ name: 'economic_activity:' })
  economicActivity: string;

  @ManyToOne(() => User, (user) => user.company)
  user: User;

  @OneToMany(() => Pdv, (pdv) => pdv.company)
  pdvs: Pdv[];

  @OneToMany(() => Category, (category) => category.company)
  categories: Category[];
}
