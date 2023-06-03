import { Inject, Injectable } from '@nestjs/common';
import {
  I_LOCATION_REPOSITORY,
  LocationRepository,
} from './repositories/location.repository';
import { Department } from './entities/department.entity';

@Injectable()
export class LocationService {
  constructor(
    @Inject(I_LOCATION_REPOSITORY)
    private readonly locationRepo: LocationRepository,
  ) {}

  findAll = async (rel: boolean): Promise<Department[]> =>
    await this.locationRepo.find(rel);

  findOne = async (id: string, rel: boolean): Promise<Department> =>
    await this.locationRepo.findOne(id, rel);
}
