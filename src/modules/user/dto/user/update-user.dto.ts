import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { UpdateProfileDto } from '../profile/update-profile.dto';

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 55)
  @IsOptional()
  password?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile?: UpdateProfileDto;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  firstLogin?: boolean;
}
