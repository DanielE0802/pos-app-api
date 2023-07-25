import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { Profile } from 'src/modules/user/entities/profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(() => Profile, (profile) => profile.company)
  profiles: Profile[];

  @OneToMany(() => Pdv, (pdv) => pdv.company)
  pdvs: Pdv[];
}
