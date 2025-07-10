import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IsNull } from 'typeorm';
import { Contact } from '../entities';
import { ContactRepository } from 'src/common/repositories';
import { GetContactService } from './get-contact.service';
import { UpdateContactDto } from '../dtos/contact';
import { MakeTransactional } from 'src/infrastructure/decorators';

@Injectable()
export class UpdateContactService {
  private _logger = new Logger(UpdateContactService.name);
  constructor(
    @Inject(ContactRepository)
    private readonly _contactRepository: ContactRepository,
    private readonly _getContactService: GetContactService,
  ) {}

  @MakeTransactional()
  async execute(
    contactId: number,
    companyId: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const existingContact = await this._getContactService.execute(
      contactId,
      companyId,
    );

    try {
      const contactUpdated = await this._contactRepository.save({
        ...existingContact,
        ...updateContactDto,
      });

      this._logger.debug(`Contact with id ${contactUpdated.id} updated`);

      return contactUpdated;
    } catch (error) {
      this._logger.error(error.message);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inexperado al actualizar un contacto',
      );
    }
  }
}
