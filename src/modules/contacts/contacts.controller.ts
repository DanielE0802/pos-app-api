import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/contact/create-contact.dto';
import { UpdateContactDto } from './dto/contact/update-contact.dto';
import { GetUserCompany } from '../auth/decorators/get-user.decorator';
import { IRelationType } from 'src/common/types/relation.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Contacts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(
    @GetUserCompany() company: IRelationType,
    @Body() data: CreateContactDto,
  ) {
    data.company = company;
    return this.contactsService.create(data);
  }

  @Get()
  findAll(@GetUserCompany() company: IRelationType) {
    return this.contactsService.findAll(company.id);
  }

  @Get(':id')
  findOne(
    @GetUserCompany() company: IRelationType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.contactsService.findOne(id, company.id);
  }

  @Patch(':id')
  update(
    @GetUserCompany() company: IRelationType,
    @Param('id') id: string,
    @Body() data: UpdateContactDto,
  ) {
    return this.contactsService.update(id, data);
  }

  @Delete(':id')
  remove(@GetUserCompany() company: IRelationType, @Param('id') id: string) {
    return this.contactsService.remove(id, company.id);
  }
}
