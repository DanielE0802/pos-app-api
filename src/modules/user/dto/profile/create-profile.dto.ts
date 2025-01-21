import { IsString, Length, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
