import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import {
  I_USER_REPOSITORY,
  UserRepository,
} from './repositories/users.repository';
import { NFE } from 'src/common/exceptions/exception.string';
import { CreateUserDto } from './dto/create-user.dto';

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

  async getUniqueUser(id: string): Promise<User> {
    try {
      return await this.usersRepository.getUserById(id);
    } catch (e) {
      throw new NotFoundException(`${NFE.NOT_USER}`);
    }
  }

  async getUserByUsername(un: string): Promise<User> {
    const user = await this.usersRepository.getUserByUsername(un);
    if (!user) throw new NotFoundException(`${NFE.NOT_USER_BY}: ${un}`);
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

  async activateUser(user: User): Promise<User> {
    return await this.usersRepository.verifyUser(user);
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
