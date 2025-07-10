import { Inject, Logger } from '@nestjs/common';
import { UserRepository } from 'src/common/repositories';
import { User } from 'src/common/entities';
import {
  UserFiltersType,
  UserRelationsType,
} from '../dtos/in/user-filters.dto';

export class FindUserService {
  private _logger = new Logger('FindUserService');

  constructor(
    @Inject(UserRepository)
    private readonly _userRepo: UserRepository,
  ) {}

  async execute(
    filters: UserFiltersType,
    relations?: UserRelationsType,
  ): Promise<User> {
    return await this._userRepo.findOneByFilters(filters, relations);
  }
}
