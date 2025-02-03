import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { BaseEntity } from './base.entity';

import { v4 } from 'uuid';

@Entity('users')
@Index(['authId', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @Column({ name: 'auth_id', unique: true })
  authId: string;

  @Column({ length: 100, unique: true })
  email: string;

  // TODO: Temporal hasta que se integre KeyCloak
  @Column({ length: 155 })
  password: string;

  // TODO: establecer en falso por defecto hasta que se haya implementado EmailService
  @Column({ type: 'boolean', default: true })
  verified: boolean;

  // TODO: Implementar UserTokens como entidad para almacenar tokens temporales
  @Column({
    length: 55,
    unique: true,
    nullable: true,
    name: 'verify_token',
  })
  verifyToken: string;

  // TODO: Implementar UserTokens como entidad para almacenar tokens temporales
  @Column({
    length: 55,
    unique: true,
    nullable: true,
    name: 'reset_password_token',
  })
  resetPasswordToken: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Company, (company) => company.user)
  company: Company[];

  // TODO: Temporal hasta que se integre KeyCloak
  @BeforeInsert()
  setDefaultRoles() {
    this.authId = v4();
  }
}
