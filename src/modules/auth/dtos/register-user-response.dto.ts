import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;
}
