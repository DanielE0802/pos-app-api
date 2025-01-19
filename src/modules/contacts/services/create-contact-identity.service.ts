import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseResponse } from 'src/common/dtos';
import { ContactIdentityRepository } from 'src/common/repositories';
import { CreateIdentityDto } from '../dtos/identity/create-identity.dto';
import { ContactIdentity } from '../entities';

@Injectable()
export class CreateContactIdentityService {
  private _logger = new Logger(CreateContactIdentityService.name);
  constructor(
    @Inject(ContactIdentityRepository)
    private readonly _contactIdentityRepository: ContactIdentityRepository,
  ) {}

  async execute(
    data: CreateIdentityDto,
  ): Promise<BaseResponse<ContactIdentity>> {
    

    return;
  }
}
