import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Min, Max, Length } from 'class-validator';

export class ProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 13)
  dni: string;
}
