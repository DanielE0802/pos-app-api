import { IsNotEmpty, IsNumber, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IRelationType } from 'src/common/decorators/relation.decorator';

export class CreateProductsPdvDto {
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
  @Type(() => IRelationType)
  @ValidateNested()
  product?: IRelationType;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => IRelationType)
  @ValidateNested()
  pdv: IRelationType;
}
