import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsPhoneNumber,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { IdToRelation } from 'src/common/decorators/relation.decorator';

export class CreateProfileDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 13)
  dni: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => IdToRelation)
  @ValidateNested()
  company: IdToRelation;
}
