import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Contact } from 'src/common/entities';
import { ContactRepository } from 'src/common/repositories';
import { CreateContactDto } from '../dtos/contact/create-contact.dto';
import { CreateContactIdentityService } from './create-contact-identity.service';
import { MakeTransactional } from 'src/infrastructure/decorators';

@Injectable()
export class CreateContactService {
  private _logger = new Logger(CreateContactService.name);
  constructor(
    @Inject(ContactRepository)
    private readonly _contactRepository: ContactRepository,
    private readonly _createContactIdentityService: CreateContactIdentityService,
  ) {}

  @MakeTransactional()
  async execute(data: CreateContactDto): Promise<Contact> {
    const { identity, companyId, email, phoneNumber } = data;

    const contactExistsByCompany = await this._contactRepository.find({
      where: [
        { companyId, email },
        { companyId, phoneNumber },
      ],
    });

    if (contactExistsByCompany.length) {
      this._logger.error(`Fintechs not found.`);
      throw new UnprocessableEntityException(
        `Ya existe un contacto con este email/telefono`,
      );
    }

    const contactIdentityResult =
      await this._createContactIdentityService.execute(identity);

    const createdContact = await this._contactRepository.save(
      this._contactRepository.create({
        ...data,
        identity: contactIdentityResult,
      }),
    );

    if (!createdContact) {
      this._logger.error('Contact can not be created');
      throw new InternalServerErrorException('No se pudo crear el contacto');
    }

    this._logger.debug(`Contact created -> ${createdContact.id}`);
    return createdContact;
  }
}
