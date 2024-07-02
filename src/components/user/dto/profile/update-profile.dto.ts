import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsPhoneNumber } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsString()
  @Length(6, 13)
  @IsOptional()
  dni?: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  personalPhoneNumber?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  photo?: string;
}
