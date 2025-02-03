import { UserRepository } from './users.repository';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../common/entities/user.entity';
import { RegisterUserDto } from '../../../auth/dtos/register-user.dto';
import { Profile } from '../../../../common/entities/profile.entity';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { NFE } from 'src/common/exceptions/exception.string';

@Injectable()
export class UserImplRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(data: RegisterUserDto): Promise<User> {
    const { profile } = data;

    return await this.userRepository.save(
      this.userRepository.create({
        ...data,
        profile: this.profileRepository.create(profile),
      }),
    );
  }

  async findAll(pags: PaginationDto): Promise<User[]> {
    const { pageSize, page } = pags;

    return await this.userRepository.find({
      select: { password: false },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { company: true },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      select: {
        id: true,
        email: true,
        password: true,
        verified: true,
        verifyToken: true,
      },
      where: { email },
      relations: { company: true },
    });
  }

  async findInectiveUsersByCode(
    id: number,
    verifyToken: string,
  ): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, verifyToken, verified: false },
    });
  }

  async findByResetPasswordToken(resetPasswordToken: string): Promise<User> {
    return await this.userRepository.findOne({ where: { resetPasswordToken } });
  }

  async update(id: number, data: UpdateUserDto): Promise<any> {
    const { profile, ...rest } = data;
    const user = await this.userRepository.findOneOrFail({ where: { id } });

    Object.assign(user, rest);
    if (profile) Object.assign(user.profile, profile);

    await this.userRepository.save(user);
    return user;
  }
}
