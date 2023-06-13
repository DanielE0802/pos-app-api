import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { ITown } from 'src/modules/location/dto/town.dto';

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
  @Type(() => ITown)
  @ValidateNested()
  location: ITown;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('CO')
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  main: boolean;
}
