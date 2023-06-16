import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Company } from 'src/modules/company/entities/company.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, select: false })
  password: string;

  /**
   * TODO: set default false when EmailService has implemented
   */
  @Column({ type: 'boolean', default: true })
  verified: boolean;

  @Column({
    length: 55,
    unique: true,
    name: 'verify_token',
    nullable: true,
  })
  verifyToken: string;

  @Column({
    length: 55,
    unique: true,
    name: 'reset_password_token',
    nullable: true,
  })
  resetPasswordToken: string;

  @Column({
    type: 'boolean',
    default: true,
    name: 'first_login',
  })
  isFirstLogin: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, { nullable: false })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @CreateDateColumn({ select: false, name: 'created_on' })
  createdOn: Date;
}
