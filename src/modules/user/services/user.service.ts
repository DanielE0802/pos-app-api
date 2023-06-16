import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { NFE } from 'src/common/exceptions/exception.string';
import { CreateUserDto } from '../dto/user/create-user.dto';
import {
  I_USER_REPOSITORY,
  UserRepository,
} from '../repositories/user/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(I_USER_REPOSITORY)
    private readonly usersRepository: UserRepository,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(data);
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersRepository.getUsers();
    } catch (e) {
      throw new NotFoundException(`${NFE.NOT_USER}`);
    }
  }

  async getAllActiveUsers(): Promise<User[]> {
    try {
      return await this.usersRepository.getUsersOn();
    } catch (e) {
      throw new NotFoundException(`${NFE.NOT_USER}s`);
    }
  }

  async getUser(id: string): Promise<User> {
    const user = await this.usersRepository.getUser(id);
    if (!user) throw new NotFoundException(`${NFE.NOT_USER}`);

    return user;
  }

  async update(id: string, data: any): Promise<boolean> {
    try {
      await this.usersRepository.update(id, data);
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  async getInectiveUsersByCode(uid: string, code: string): Promise<User> {
    return await this.usersRepository.getInectiveUsersByCode(uid, code);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.getUserByEmail(email);
  }

  async getUserByResetPasswordToken(resetPasswordToken: string) {
    return await this.usersRepository.getUserByResetPasswordToken(
      resetPasswordToken,
    );
  }
}