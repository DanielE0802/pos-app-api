import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 55 })
  name: string;

  @Column({ length: 55 })
  lastname: string;

  @Column({ length: 55 })
  dni: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}