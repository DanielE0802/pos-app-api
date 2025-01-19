import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
    const newIdentity = await this._contactIdentityRepository.save(
      this._contactIdentityRepository.create(data),
    );

    if (!newIdentity) {
      this._logger.error('IdentityContact can not be created');
      throw new InternalServerErrorException(
        'No se pudo crear la identidad del contacto',
      );
    }

    return { data: newIdentity };
  }
}
