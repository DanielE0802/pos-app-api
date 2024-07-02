import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  resetPasswordToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 55)
  password: string;
}
