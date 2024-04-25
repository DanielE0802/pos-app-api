import { User } from 'src/common/entities/user.entity';
import { FindOptionsRelations } from 'typeorm';

export declare type CustomRelations<T> = FindOptionsRelations<T>;

export type TokenUser = User;
