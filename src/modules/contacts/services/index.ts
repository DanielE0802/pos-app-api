import { CreateContactIdentityService } from './create-contact-identity.service';
import { CreateContactService } from './create-contact.service';
import { GetContactService } from './get-contact.service';
import { GetContactsService } from './get-contacts.service';
import { SoftDeleteContactService } from './soft-delete.service';
import { UpdateContactService } from './update-contact.service';

export const ContactServices = [
  CreateContactService,
  CreateContactIdentityService,
  GetContactService,
  GetContactsService,
  UpdateContactService,
  SoftDeleteContactService,
];
