import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProfileDto } from '../profile/create-profile.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 16)
  password: string;

  @IsOptional()
  verifyToken: string;

  @IsOptional()
  isFirstLogin: boolean;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}
