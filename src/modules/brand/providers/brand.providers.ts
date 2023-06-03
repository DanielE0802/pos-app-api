import { BrandImplRepository } from '../repositories/brand.impl.repository';
import { I_BRAND_REPOSITORY } from '../repositories/brand.repository';

export const BrandProviders = [
  {
    provide: I_BRAND_REPOSITORY,
    useClass: BrandImplRepository,
  },
];
