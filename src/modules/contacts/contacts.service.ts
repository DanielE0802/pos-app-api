import { Inject, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/contact/create-contact.dto';
import { UpdateContactDto } from './dto/contact/update-contact.dto';
import {
  ContactRepository,
  I_CONTACT_REPOSITORY,
} from './repositories/contact.repository';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(I_CONTACT_REPOSITORY)
    private readonly contactRepo: ContactRepository,
  ) {}

  create = async (data: CreateContactDto) => {
    return await this.contactRepo.create(data);
  };

  findAll = async (company: string) =>
    await this.contactRepo.find(company, false);

  findOne = async (id: string, company: string) =>
    await this.contactRepo.findOne(id, company, false);

  update = async (id: string, data: UpdateContactDto) =>
    await this.contactRepo.update(id, data);

  async remove(id: string, company: string) {
    const deleting = await this.contactRepo.findOne(id, company, false);
    return await this.contactRepo.delete(deleting);
  }
}
