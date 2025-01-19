import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CreateIdentityDto } from '../identity/create-identity.dto';
import { ContactType } from 'src/common/constants/app/person-identity.app';
import { IsAddress } from './validators/address.validator';

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsAddress()
  address: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber2?: string;

  @ApiProperty()
  @IsInt()
  @IsEnum(ContactType)
  type: number;

  @ApiProperty()
  @Type(() => CreateIdentityDto)
  identity: CreateIdentityDto;

  @ApiProperty()
  @Type(() => Number)
  townId: number;

  @IsOptional()
  companyId: string;
}
