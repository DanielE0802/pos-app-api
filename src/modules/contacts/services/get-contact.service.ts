import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { BaseResponse } from 'src/common/dtos';
import { Contact } from '../entities';
import { ContactRepository } from 'src/common/repositories';

@Injectable()
export class GetContactService {
  private _logger = new Logger(GetContactService.name);
  constructor(
    @Inject(ContactRepository)
    private readonly _contactRepository: ContactRepository,
  ) {}

  async execute(
    contactId: number,
    companyId: string,
  ): Promise<BaseResponse<Contact>> {
    const currentContact = await this._contactRepository.findOne({
      where: {
        id: contactId,
        companyId,
        deletedAt: IsNull(),
      },
      relations: { identity: true },
      cache: true,
    });

    if (!currentContact) {
      this._logger.error(`Contact with contactId ${contactId} not found`);
      throw new NotFoundException('No se encontró un usuario');
    }

    this._logger.debug(`Contact with contactId ${currentContact.id} found`);

    return {
      data: currentContact,
    };
  }
}
