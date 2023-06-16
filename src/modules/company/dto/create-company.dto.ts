import {
  IsNotEmpty,
  Length,
  IsPhoneNumber,
  IsUrl,
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 50)
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nit: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 20)
  @IsPhoneNumber('CO')
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  website: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quantity_employees: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  economic_activity: string;
}
