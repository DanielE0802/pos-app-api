import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('companies')
export class Company {
  // Nombre completo o razón social y NIT
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true })
  business_name: string;

  @Column()
  nit: string;

  @Column({ length: 50 })
  address: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ length: 55 })
  email: string;

  @Column()
  website: string;

  @Column({ type: 'int' })
  quantity_employees: number;

  @Column()
  economic_activity: string;

  @Column()
  source: string;

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Pdv, (pdv) => pdv.company)
  pdvs: Pdv[];
}
