import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserService } from 'src/modules/user/services/find-user.service';
import { Repository } from 'typeorm';
import { Company } from 'src/common/entities';
import { FindCompanyByCompanyIdService } from './find-company.service';

@Injectable()
export class AddUserToCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly _companyRepo: Repository<Company>,
    private readonly _findCompanyService: FindCompanyByCompanyIdService,
    private readonly _findUserService: FindUserService,
  ) {}

  async execute(companyId: string, userId: string): Promise<{ msg: string }> {
    const currentCompany = await this._findCompanyService.execute(companyId);

    const user = await this._findUserService.execute({ authId: userId });
    if (!user) throw new NotFoundException('User not found');

    if (currentCompany.userId) {
      throw new ConflictException('Company already has an assigned user');
    }

    currentCompany.userId = user.id;

    await this._companyRepo.save(currentCompany);
    return { msg: 'User added to company' };
  }
}
