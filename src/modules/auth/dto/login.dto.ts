import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 55)
  password: string;
}
