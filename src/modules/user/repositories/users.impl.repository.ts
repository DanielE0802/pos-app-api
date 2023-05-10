import { UserRepository } from './users.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class UserImplRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { profile } = createUserDto;

    const _profile = await this.profileRepository.save(
      this.profileRepository.create(profile),
    );

    return await this._save(
      this.userRepository.create({ ...createUserDto, profile: _profile }),
    );
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUsersOn(): Promise<User[]> {
    return await this.userRepository.find({ where: { verified: true } });
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      select: {
        id: true,
        email: true,
        password: true,
        verified: true,
        verifyToken: true,
      },
      where: { email },
    });
  }

  async getInectiveUsersByCode(id: string, verifyToken: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, verifyToken, verified: false },
    });
  }

  async getUserByResetPasswordToken(resetPasswordToken: string): Promise<User> {
    return await this.userRepository.findOne({ where: { resetPasswordToken } });
  }

  async update(id: string, data: any): Promise<void> {
    await this.userRepository.update(id, data);
  }

  // +--------------------------------+
  // |  Private Encapsulated Methods  |
  // +--------------------------------+

  private async _save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
