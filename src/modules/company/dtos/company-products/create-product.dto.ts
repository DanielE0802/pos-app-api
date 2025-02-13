import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { TypeProduct } from 'src/common/constants/app/products.app';

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
  @Transform(({ value }) => value.toString())
  @ApiProperty()
  barCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  images: string[];

  @ApiProperty()
  @IsNotEmpty()
  // @Transform(({ value }) => TypeProduct.find((i) => i.type == value).id)
  typeProduct: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  state: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  sellInNegative: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  taxesOption: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toString())
  sku: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  priceSale: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  priceBase: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  quantityStock: number;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @Type(() => IRelationType)
  // productMainProduct: IRelationType; // ID of the main product (optional)

  // TODO: Revisar Insercion con SubPruductos
  // @ApiPropertyOptional()
  // @IsOptional()
  // @IsNumber({}, { each: true })
  // @ValidateNested({ each: true })
  // @Type(() => String)
  // subProductsIds: string[]; // Array of IDs of sub-products (optional)

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  brandId: string;
}
