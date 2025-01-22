import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { BaseResponse, PaginationDto } from 'src/common/dtos';
import { Contact } from '../entities';
import { ContactRepository } from 'src/common/repositories';

@Injectable()
export class GetContactsService {
  private _logger = new Logger(GetContactsService.name);
  constructor(
    @Inject(ContactRepository)
    private readonly _contactRepository: ContactRepository,
  ) {}

  async execute(
    companyId: string,
    pags: PaginationDto,
  ): Promise<BaseResponse<Contact[]>> {
    const { pageSize, page } = pags;

    const currentContacts = await this._contactRepository.find({
      where: {
        companyId,
        deletedAt: IsNull(),
      },
      relations: { identity: true, town: true },
      order: { createdAt: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      cache: true,
    });

    if (!currentContacts) {
      this._logger.error(`Contacts for companyId ${companyId} not found`);
      throw new NotFoundException('No se encontraron contactos');
    }

    return {
      data: currentContacts,
    };
  }
}
