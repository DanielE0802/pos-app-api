import { UserRepository } from './users.repository';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class UserImplRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create = async (createUserDto: CreateUserDto): Promise<User> => {
    const { profile } = createUserDto;

    const _profile = await this.profileRepository.save(
      this.profileRepository.create(profile),
    );

    return await this.userRepository.save(
      this.userRepository.create({ ...createUserDto, profile: _profile }),
    );
  };

  findAll = async (): Promise<User[]> => await this.userRepository.find();

  findAllVerify = async (): Promise<User[]> => {
    return await this.userRepository.find({ where: { verified: true } });
  };

  findOne = async (id: string): Promise<User> => {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  };

  findByEmail = async (email: string): Promise<User> => {
    return await this.userRepository.findOne({
      select: {
        id: true,
        password: true,
        verified: true,
        verifyToken: true,
        profile: { email: true, company: { id: true } },
      },
      where: { profile: { email } },
      relations: { profile: { company: true } },
    });
  };

  findInectiveUsersByCode = async (
    id: string,
    verifyToken: string,
  ): Promise<User> => {
    return await this.userRepository.findOne({
      where: { id, verifyToken, verified: false },
    });
  };

  findByResetPasswordToken = async (
    resetPasswordToken: string,
  ): Promise<User> => {
    return await this.userRepository.findOne({ where: { resetPasswordToken } });
  };

  update = async (id: string, data: any): Promise<UpdateResult> =>
    await this.userRepository.update(id, data);
}
