import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { NFE } from 'src/common/exceptions/exception.string';
import { CreateUserDto } from '../dto/user/create-user.dto';
import {
  I_USER_REPOSITORY,
  UserRepository,
} from '../repositories/user/users.repository';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dto/user/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(I_USER_REPOSITORY) private readonly usersRepository: UserRepository,
  ) {}

  // TODO: Impl Profile custom Repository
  create = async (data: CreateUserDto): Promise<User> =>
    await this.usersRepository.create(data);

  findAll = async (): Promise<User[]> => await this.usersRepository.findAll();

  findOne = async (id: string): Promise<User> =>
    await this.usersRepository.findOne(id);

  findAllVerify = async (): Promise<User[]> =>
    await this.usersRepository.findAllVerify();

  findInectiveUsersByCode = async (uid: string, code: string): Promise<User> =>
    await this.usersRepository.findInectiveUsersByCode(uid, code);

  findByEmail = async (email: string): Promise<User> =>
    await this.usersRepository.findByEmail(email);

  findByResetPasswordToken = async (resetPasswordToken: string) =>
    await this.usersRepository.findByResetPasswordToken(resetPasswordToken);

  update = async (id: string, data: UpdateUserDto): Promise<UpdateResult> =>
    await this.usersRepository.update(id, data);
}
