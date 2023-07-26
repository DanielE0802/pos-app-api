import { User } from 'src/modules/user/entities/user.entity';
import { FindOptionsRelations } from 'typeorm';

export declare type CustomRelations<T> = FindOptionsRelations<T>;

export type TokenUser = User;

export const TypeProduct = [
  { id: 1, type: 'simple' },
  { id: 2, type: 'configurable' },
];
