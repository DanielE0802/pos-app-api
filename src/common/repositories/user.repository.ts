import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  Repository,
} from 'typeorm';
import { User } from '../entities';
import { PaginationDto } from '../dtos';
import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class UserRepository extends Repository<User> {
  private readonly _logger = new Logger(UserRepository.name);
  constructor(
    @InjectRepository(User) private readonly _repo: Repository<User>,
  ) {
    super(_repo.target, _repo.manager, _repo.queryRunner);
  }

  public async findByFilters(
    filters: FindOptionsWhere<User>,
    pagination: PaginationDto,
    relations?: FindOptionsRelations<User>,
  ): Promise<[User[], number]> {
    const { page, pageSize } = pagination;
    const findOptions = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      cache: true,
    };
    const [users, total] = await this._repo.findAndCount({
      where: { ...filters, deletedAt: IsNull() },
      withDeleted: false,
      ...findOptions,
      relations: relations || {},
    });
    if (!users) {
      this._logger.error(
        `Users not found with filters ${JSON.stringify(filters)}`,
      );
      throw new NotFoundException('Users not found.');
    }
    return [users, total];
  }

  public async findOneByFilters(
    filters: FindOptionsWhere<User>,
    relations?: FindOptionsRelations<User>,
  ): Promise<User> {
    const user = await this._repo.findOne({
      where: { ...filters, deletedAt: IsNull() },
      relations: relations || {},
      withDeleted: false,
    });
    if (!user) {
      this._logger.error(
        `User not found with filters ${JSON.stringify(filters)}`,
      );
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  public async validateIfUserExist(
    filters: FindOptionsWhere<User>,
  ): Promise<void> {
    const user = await this._repo.findOne({
      where: { ...filters, deletedAt: IsNull() },
      withDeleted: false,
    });
    if (user) throw new UnprocessableEntityException('User already exists.');
  }
}
