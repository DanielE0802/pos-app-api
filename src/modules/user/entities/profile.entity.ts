import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Company } from 'src/modules/company/entities/company.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 55 })
  name: string;

  @Column({ length: 55 })
  lastname: string;

  @Column({ length: 55, unique: true })
  dni: string;

  @Column({ length: 55, unique: true })
  phone: string;

  @Column({ length: 155, nullable: true })
  photo: string;

  @ManyToOne(() => Company, (company) => company.profiles)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
