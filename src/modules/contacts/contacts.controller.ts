import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyIdHeaderDto } from 'src/common/dtos/company-headers.dto';
import { CustomHeaders } from 'src/infrastructure/decorators/custom-headers.decorator';
import { BaseResponse, PaginationDto } from 'src/common/dtos';
import { CreateContactDto, UpdateContactDto } from './dtos/contact';
import { CreateContactService } from './services/create-contact.service';
import { Contact } from './entities';
import { GetContactService } from './services/get-contact.service';
import { GetContactsService } from './services/get-contacts.service';
import { UpdateContactService } from './services/update-contact.service';
import { SoftDeleteContactService } from './services/soft-delete.service';

@ApiTags('Contacts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly _createContactService: CreateContactService,
    private readonly _getContactService: GetContactService,
    private readonly _getContactsService: GetContactsService,
    private readonly _updateContactService: UpdateContactService,
    private readonly _softDeleteContactService: SoftDeleteContactService,
  ) {}

  @Post()
  async create(
    @CustomHeaders(CompanyIdHeaderDto) companyIdHeader: CompanyIdHeaderDto,
    @Body() input: CreateContactDto,
  ): Promise<BaseResponse<Contact>> {
    return this._createContactService.execute({
      ...input,
      companyId: companyIdHeader['company-id'],
    });
  }

  @Get('/:contactId')
  findOne(
    @CustomHeaders(CompanyIdHeaderDto) companyIdHeader: CompanyIdHeaderDto,
    @Param('contactId', ParseIntPipe) id: number,
  ): Promise<BaseResponse<Contact>> {
    return this._getContactService.execute(id, companyIdHeader['company-id']);
  }

  @Get()
  findAll(
    @CustomHeaders(CompanyIdHeaderDto) companyIdHeader: CompanyIdHeaderDto,
    @Query() query: PaginationDto,
  ) {
    return this._getContactsService.execute(companyIdHeader['company-id'], {
      page: query.page,
      pageSize: query.pageSize,
    });
  }

  @Patch('/:contactId')
  update(
    @CustomHeaders(CompanyIdHeaderDto) companyIdHeader: CompanyIdHeaderDto,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() input: UpdateContactDto,
  ) {
    return this._updateContactService.execute(
      contactId,
      companyIdHeader['company-id'],
      input,
    );
  }

  @Delete('/:contactId')
  remove(
    @CustomHeaders(CompanyIdHeaderDto) companyIdHeader: CompanyIdHeaderDto,
    @Param('contactId', ParseIntPipe) contactId: number,
  ) {
    return this._softDeleteContactService.execute(
      contactId,
      companyIdHeader['company-id'],
    );
  }
}
