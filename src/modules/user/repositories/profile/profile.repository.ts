import { CreateProfileDto } from '../../dto/profile/create-profile.dto';
import { UpdateProfileDto } from '../../dto/profile/update-profile.dto';
import { Profile } from '../../entities/profile.entity';

export interface ProfileRepository {
  create: (data: CreateProfileDto) => Promise<Profile>;

  find: (rel: boolean) => Promise<Profile[]>;

  findOne: (id: string, rel: boolean) => Promise<Profile>;

  update: (id: string, data: UpdateProfileDto) => Promise<Profile>;

  delete: (id: string) => Promise<Profile>;
}

export const I_PROFILE_REPOSITORY = 'ProfileIRepository';
