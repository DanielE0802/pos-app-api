import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  CompanyRepository,
  I_COMPANY_REPOSITORY,
} from './repositories/company.repository';
import { Company } from './entities/company.entity';
import { UsersService } from '../user/services/user.service';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(I_COMPANY_REPOSITORY)
    private readonly _companyRepo: CompanyRepository,
    private _userService: UsersService,
  ) {}

  async create(data: CreateCompanyDto) {
    return await this._companyRepo.create(data);
  }

  async findAll(rel: boolean): Promise<Company[]> {
    return await this._companyRepo.find(rel);
  }

  async findOne(id: string, rel: boolean) {
    const company = await this._companyRepo.findOne(id, rel);
    if (!company) throw new NotFoundException('Cant find Company');
    return company;
  }

  async update(id: string, data: UpdateCompanyDto) {
    return await this._companyRepo.update(id, data);
  }
  async remove(id: string) {
    return await this._companyRepo.delete(id);
  }

  async addUser(companyId: string, userId: string) {
    const currentCompany = await this._companyRepo.findOne(companyId, true);
    const currentUser = await this._userService.findById(+userId);

    await this._companyRepo.update(currentCompany.id, {
      userId: currentUser.id,
    });

    return { msg: 'User added to company' };
  }
}
