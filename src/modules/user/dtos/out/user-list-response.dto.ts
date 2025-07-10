import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/common/entities';
import { PaginationDataResponseDto } from 'src/common/dtos/pagination-data-response.dto';

export class UserListResponseDto extends PaginationDataResponseDto {
  @ApiProperty({ type: [User] })
  users: User[];
}
