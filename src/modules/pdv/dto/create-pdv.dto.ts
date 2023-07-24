import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { RelationType } from 'src/common/decorators/relation.decorator';

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
  @Type(() => RelationType)
  @ValidateNested()
  location: RelationType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  main: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => RelationType)
  @ValidateNested()
  company: RelationType;
}
