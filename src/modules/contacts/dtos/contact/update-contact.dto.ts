import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';
import { IsAddress } from './validators/address.validator';

export class UpdateContactDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsAddress()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber2?: string;
}
