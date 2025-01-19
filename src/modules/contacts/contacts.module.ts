import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact, ContactIdentity } from './entities';
import {
  ContactRepository,
  ContactIdentityRepository,
} from 'src/common/repositories';
import { ContactsController } from './contacts.controller';
import { ContactServices } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, ContactIdentity])],
  controllers: [ContactsController],
  providers: [...ContactServices, ContactRepository, ContactIdentityRepository],
})
export class ContactsModule {}
