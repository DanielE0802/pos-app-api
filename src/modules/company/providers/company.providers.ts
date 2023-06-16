import { CompanyImplRepository } from '../repositories/company.impl.repository';
import { I_COMPANY_REPOSITORY } from '../repositories/company.repository';

export const CompanyProviders = [
  {
    provide: I_COMPANY_REPOSITORY,
    useClass: CompanyImplRepository,
  },
];
