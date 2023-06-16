import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { Profile } from 'src/modules/user/entities/profile.entity';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  nit: string;

  @Column({ length: 50 })
  address: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column()
  website: string;

  @Column()
  quantity_employees: string;

  @Column()
  economic_activity: string;

  @OneToMany(() => Profile, (profile) => profile.company)
  profiles: Profile[];

  @OneToMany(() => Pdv, (pdv) => pdv.company)
  pdvs: Pdv[];
}
