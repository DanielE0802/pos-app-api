import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductPdvDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  minQuantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => ({ id: value }))
  products?: { id: string };

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => ({ id: value }))
  pdvs: { id: string };
}
