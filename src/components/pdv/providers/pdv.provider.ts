import { PdvImplRepository } from '../repositories/pdv.impl.repository';
import { I_PDV_REPOSITORY } from '../repositories/pdv.repository';

export const PdvProviders = [
  {
    provide: I_PDV_REPOSITORY,
    useClass: PdvImplRepository,
  },
];
