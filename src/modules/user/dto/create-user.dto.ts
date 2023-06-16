import {
  IsString,
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
