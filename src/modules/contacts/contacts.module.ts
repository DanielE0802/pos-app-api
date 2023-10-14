import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Identity } from './entities/identy.entity';
import { ContactImplRepository } from './repositories/contact.impl.repository';
import { I_CONTACT_REPOSITORY } from './repositories/contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Identity])],
  controllers: [ContactsController],
  providers: [
    ContactsService,
    { provide: I_CONTACT_REPOSITORY, useClass: ContactImplRepository },
  ],
})
export class ContactsModule {}
