import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { User } from 'src/common/entities';

export type UserFiltersType = FindOptionsWhere<User>;
export type UserRelationsType = FindOptionsRelations<User>;
