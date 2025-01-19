import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseResponse } from 'src/common/dtos';
import { ContactRepository } from 'src/common/repositories';
import { GetContactService } from './get-contact.service';
import { MakeTransactional } from 'src/infrastructure/decorators';

@Injectable()
export class SoftDeleteContactService {
  private _logger = new Logger(SoftDeleteContactService.name);
  constructor(
    @Inject(ContactRepository)
    private readonly _contactRepository: ContactRepository,
    private readonly _getContactService: GetContactService,
  ) {}

  @MakeTransactional()
  async execute(contactId: number, companyId: string): Promise<BaseResponse> {
    const { data: existingContact } = await this._getContactService.execute(
      contactId,
      companyId,
    );

    try {
      await this._contactRepository.softRemove(existingContact);

      this._logger.debug(
        `Contact with contactId ${existingContact.id} inactive`,
      );

      return { message: 'Se inactivo el contacto' };
    } catch (error) {
      this._logger.error(error.message);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inexperado al inactivar un contacto',
      );
    }
  }
}
