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
import { Type } from 'class-transformer';
import { User } from 'src/modules/user/entities/user.entity';

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
  quantityEmployees: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  economicActivity: string;

  @IsOptional()
  @Type(() => User)
  user: User;
}
