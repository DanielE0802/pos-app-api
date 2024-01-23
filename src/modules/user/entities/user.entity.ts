import {
  BeforeInsert,
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

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column('varchar', { length: 155, select: false })
  password: string;

  /**
   * TODO: set default false when EmailService has implemented
   */
  @Column('boolean', { default: true })
  verified: boolean;

  @Column('boolean', { name: 'is_active', default: true })
  isActive: boolean;

  @Column('varchar', {
    length: 55,
    unique: true,
    nullable: true,
    name: 'verify_token',
  })
  verifyToken: string;

  @Column('varchar', {
    length: 55,
    unique: true,
    nullable: true,
    name: 'reset_password_token',
  })
  resetPasswordToken: string;

  @Column('boolean', {
    default: true,
    name: 'first_login',
  })
  firstLogin: boolean;

  @Column('simple-array', { nullable: true })
  roles: string[];

  @OneToOne(() => Profile, (profile) => profile.user, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => Company, (company) => company.user)
  @JoinColumn({ name: 'company_id' })
  company: Company[];

  @CreateDateColumn({ select: false, name: 'created_on' })
  createdOn: Date;

  @BeforeInsert()
  setDefaultRoles() {
    if (!this.roles || this.roles.length === 0) {
      this.roles = ['owner'];
    }
  }
}
