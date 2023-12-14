import { UserRepository } from './users.repository';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { Profile } from '../../entities/profile.entity';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NFE } from 'src/common/exceptions/exception.string';

@Injectable()
export class UserImplRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const { profile } = data;

    return await this.userRepository.save(
      this.userRepository.create({
        ...data,
        profile: this.profileRepository.create(profile),
      }),
    );
  }

  async findAll(pags: PaginationDto): Promise<User[]> {
    return await this.userRepository.find({
      skip: pags.offset,
      take: pags.limit,
    });
  }

  async findById(id: string): Promise<User> {
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
    id: string,
    verifyToken: string,
  ): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, verifyToken, verified: false },
    });
  }

  async findByResetPasswordToken(resetPasswordToken: string): Promise<User> {
    return await this.userRepository.findOne({ where: { resetPasswordToken } });
  }

  async update(id: string, data: UpdateUserDto): Promise<any> {
    const { profile, ...rest } = data;
    const user = await this.userRepository.findOneOrFail({ where: { id } });

    Object.assign(user, rest);
    if (profile) Object.assign(user.profile, profile);

    await this.userRepository.save(user);
    return user;
  }
}
