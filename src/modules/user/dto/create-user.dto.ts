import {
  IsString,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProfileDto } from './create-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 16)
  password: string;

  @IsOptional()
  verifyToken: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
