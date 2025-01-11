import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}
