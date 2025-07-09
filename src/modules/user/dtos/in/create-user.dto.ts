import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { RegisterUserDto } from 'src/modules/auth/dtos/register-user.dto';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  @Length(6, 13)
  dni: string;

  @ApiProperty()
  @IsPhoneNumber()
  personalPhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  photo?: string;
}
export class UpdateProfileDto extends PartialType(CreateProfileDto) {}

export class CreateUserDto extends RegisterUserDto {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
