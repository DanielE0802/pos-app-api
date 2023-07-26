import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { IRelationType } from 'src/common/decorators/relation.decorator';

export class CreatePdvDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => IRelationType)
  location: IRelationType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  main: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => IRelationType)
  company: IRelationType;
}
