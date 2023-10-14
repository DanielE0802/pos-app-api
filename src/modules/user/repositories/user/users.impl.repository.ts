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
    private userRepo: Repository<User>,
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
  ) {}

  create = async (createUserDto: CreateUserDto): Promise<User> => {
    const { profile } = createUserDto;

    const _profile = await this.profileRepo.save(
      this.profileRepo.create(profile),
    );

    return await this.userRepo.save(
      this.userRepo.create({ ...createUserDto, profile: _profile }),
    );
  };

  findAll = async (): Promise<User[]> => await this.userRepo.find();

  findAllVerify = async (): Promise<User[]> =>
    await this.userRepo.find({ where: { verified: true } });

  findOne = async (id: string): Promise<User> =>
    await this.userRepo.findOne({
      where: { id },
      relations: { profile: { company: true } },
    });

  findByEmail = async (email: string): Promise<User> => {
    return await this.userRepo.findOne({
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
  ): Promise<User> =>
    await this.userRepo.findOne({
      where: { id, verifyToken, verified: false },
    });

  findByResetPasswordToken = async (
    resetPasswordToken: string,
  ): Promise<User> =>
    await this.userRepo.findOne({ where: { resetPasswordToken } });

  update = async (id: string, data: any): Promise<UpdateResult> =>
    await this.userRepo.update(id, data);
}
