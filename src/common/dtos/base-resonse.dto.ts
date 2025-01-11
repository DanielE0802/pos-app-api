import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T = any> {
  @ApiProperty()
  message?: string;

  @ApiProperty()
  data?: T;
}
