import { LocationImplRepository } from '../repositories/location.impl.repository';
import { I_LOCATION_REPOSITORY } from '../repositories/location.repository';

export const LocationProviders = [
  {
    provide: I_LOCATION_REPOSITORY,
    useClass: LocationImplRepository,
  },
];
