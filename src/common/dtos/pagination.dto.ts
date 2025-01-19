import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Max(25)
  pageSize: number;
}
