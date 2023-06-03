import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Brand } from 'src/modules/brand/entities/brand.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  barCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  priceSale: number;

  @IsNotEmpty()
  @IsString()
  @Type(() => Brand)
  @ApiProperty()
  brand: Brand;

  @IsOptional()
  @ApiPropertyOptional()
  productMainProductId: number; // ID of the main product (optional)

  @IsOptional()
  @IsNumber({}, { each: true })
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional()
  subProductsIds: number[]; // Array of IDs of sub-products (optional)

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantityStock: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  categoryId: number;
}
