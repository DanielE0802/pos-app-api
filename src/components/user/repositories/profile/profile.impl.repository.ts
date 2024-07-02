import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../../dto/profile/update-profile.dto';
import { Profile } from '../../../../common/entities/profile.entity';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from '../../dto/profile/create-profile.dto';

export class ProfileImplRepository implements ProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  create = async (data: CreateProfileDto): Promise<Profile> =>
    await this.profileRepo.save(this.profileRepo.create(data));

  find = async (rel: boolean): Promise<Profile[]> =>
    await this.profileRepo.find({ relations: {}, cache: true });

  findOne = async (id: string, rel: boolean): Promise<Profile> =>
    await this.profileRepo.findOne({
      where: { id },
      relations: {},
      cache: true,
    });

  update = async (id: string, data: UpdateProfileDto): Promise<any> =>
    await this.profileRepo.update(id, data);

  delete = async (id: string): Promise<Profile> =>
    await this.profileRepo.remove(await this.findOne(id, false));
}
