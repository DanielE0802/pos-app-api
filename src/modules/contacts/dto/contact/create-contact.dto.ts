import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IRelationType } from 'src/common/decorators/relation.decorator';
import { CreateIdentityDto } from '../identity/create-identity.dto';
import { ContactType } from 'src/common/constants/app/person-identity.app';
import { ApiProperty } from '@nestjs/swagger';
import { IsAddress } from './validators/address.validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastname?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsAddress()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phoneNumber2?: string;

  @IsNotEmpty()
  @IsInt()
  @IsEnum(ContactType)
  @ApiProperty()
  type: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateIdentityDto)
  identity: CreateIdentityDto;

  @ApiProperty()
  @IsOptional()
  @Type(() => IRelationType)
  town: IRelationType;

  @IsOptional()
  @Type(() => IRelationType)
  company: IRelationType;
}
