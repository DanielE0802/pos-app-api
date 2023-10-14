import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactRepository } from './contact.repository';
import { Contact } from '../entities/contact.entity';
import { CreateContactDto } from '../dto/contact/create-contact.dto';
import { UpdateContactDto } from '../dto/contact/update-contact.dto';
import { Identity } from '../entities/identy.entity';

@Injectable()
export class ContactImplRepository implements ContactRepository {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
    @InjectRepository(Identity)
    private readonly identityRepo: Repository<Identity>,
  ) {}

  create = async (data: CreateContactDto): Promise<Contact> => {
    const { identity } = data;

    const _identity = await this.identityRepo.save(
      this.identityRepo.create(identity),
    );

    return await this.contactRepo.save(
      this.contactRepo.create({ ...data, identity: _identity }),
    );
  };

  find = async (companyId: string, rel: boolean): Promise<Contact[]> =>
    await this.contactRepo.find({
      where: {
        company: { id: companyId },
      },
      relations: { identity: true, town: true },
      cache: true,
      loadEagerRelations: true,
    });

  findOne = async (
    id: string,
    companyId: string,
    rel: boolean,
  ): Promise<Contact> =>
    await this.contactRepo.findOne({
      where: {
        id,
        company: { id: companyId },
      },
      relations: { identity: true, town: true },
      cache: true,
    });

  update = async (id: string, data: any): Promise<UpdateResult> =>
    await this.contactRepo.update(id, data);

  delete = async (entity: Contact): Promise<any> =>
    await this.contactRepo.remove(entity);
}
