import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  barCode: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  priceSale: number;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsOptional()
  productMainProductId: number; // ID of the main product (optional)

  @IsOptional()
  @IsNumber({}, { each: true })
  @ValidateNested({ each: true })
  @Type(() => Number)
  subProductsIds: number[]; // Array of IDs of sub-products (optional)

  @IsNotEmpty()
  @IsNumber()
  quantityStock: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
