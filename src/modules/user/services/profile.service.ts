import { Inject, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';
import { Profile } from '../entities/profile.entity';
import { CreateProfileDto } from '../dto/profile/create-profile.dto';
import {
  I_PROFILE_REPOSITORY,
  ProfileRepository,
} from '../repositories/profile/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(I_PROFILE_REPOSITORY)
    private readonly profileRepo: ProfileRepository,
  ) {}

  create = async (data: CreateProfileDto) =>
    await this.profileRepo.create(data);

  findAll = async (rel: boolean): Promise<Profile[]> =>
    await this.profileRepo.find(rel);

  findOne = async (id: string, rel: boolean) =>
    await this.profileRepo.findOne(id, rel);

  update = async (id: string, data: UpdateProfileDto) =>
    await this.profileRepo.update(id, data);

  remove = async (id: string) => await this.profileRepo.delete(id);
}
