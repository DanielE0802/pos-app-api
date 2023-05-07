import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class ActivateUserDto {
  @ApiProperty({ description: 'User uuid' })
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @ApiProperty({ description: 'Activation Token' })
  @IsNotEmpty()
  code: string;
}
