import { CreateContactDto } from '../dto/contact/create-contact.dto';
import { UpdateContactDto } from '../dto/contact/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export interface ContactRepository {
  /**
   * It saves the Category to the database and returns the saved Category
   * @param {CreateCategoryDto} createCategoryDto - CreateCategoryDto
   * @returns The Category that was updated
   */
  create: (data: CreateContactDto) => Promise<Contact>;
  
  /**
   * It finds all the Categorys in the database and returns them
   * @returns An array of Category objects.
   */
  find: (companyId: string, rel: boolean) => Promise<Contact[]>;

  findOne: (id: string, companyId: string, rel: boolean) => Promise<Contact>;

  update: (id: string, data: any) => Promise<any>

  delete: (entity: Contact) => Promise<void>;
}

export const I_CONTACT_REPOSITORY = 'ContactIRepository';
