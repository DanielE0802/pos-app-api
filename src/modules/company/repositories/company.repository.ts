import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Company } from '../entities/company.entity';

export interface CompanyRepository {
  /**
   * It saves the Company to the database and returns the saved Company
   * @param {CreateCompanyDto} createCompanyDto - CreateCompanyDto
   * @returns The Company that was updated
   */
  create: (data: CreateCompanyDto) => Promise<Company>;
  /**
   * It finds all the Companys in the database and returns them
   * @returns An array of Company objects.
   */
  find: (rel: boolean) => Promise<Company[]>;

  findOne: (id: string, rel: boolean) => Promise<Company>;

  update: (id: string, data: UpdateCompanyDto) => Promise<Company>;

  delete: (id: string) => Promise<Company>;
}

export const I_COMPANY_REPOSITORY = 'CompanyIRepository';
