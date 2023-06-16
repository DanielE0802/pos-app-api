import {
  IsNotEmpty,
  Length,
  IsPhoneNumber,
  ValidateNested,
  IsUrl,
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdToRelation } from 'src/common/decorators/relation.decorator';
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
  @IsOptional()
  @IsString()
  @Length(1, 100)
  business_name?: string;

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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  website: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity_employees: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  economic_activity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => IdToRelation)
  @ValidateNested()
  user: IdToRelation;
}
