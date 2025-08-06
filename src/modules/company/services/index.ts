import { BrandService } from './brand';
import { CategoryService } from './category';
import {
  AddUserToCompanyService,
  CreateCompanyService,
  FindCompanyByCompanyIdService,
  RemoveCompanyService,
  UpdateCompanyService,
} from './company';

export const BrandServices = [BrandService];
export const CategoryServices = [CategoryService];
export const CompanyServices = [
  CreateCompanyService,
  AddUserToCompanyService,
  FindCompanyByCompanyIdService,
  RemoveCompanyService,
  UpdateCompanyService,
];

export const CompanyProviders = [
  ...BrandServices,
  ...CategoryServices,
  ...CompanyServices,
];
