import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RelationType } from 'src/common/decorators/relation.decorator';

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
  @Type(() => RelationType)
  products?: RelationType;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => RelationType)
  pdvs: RelationType;
}
