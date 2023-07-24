import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TypeProduct } from 'src/common/constants/constant.app';
import { RelationType } from 'src/common/decorators/relation.decorator';
import { CreateProductPdvDto } from './create-product-pdv.dto';

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
  @Transform(({ value }) => TypeProduct.find((i) => i.type == value).id)
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

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => RelationType)
  @ValidateNested()
  brand: RelationType;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => RelationType)
  @ValidateNested()
  productMainProduct: RelationType; // ID of the main product (optional)

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { each: true })
  @ValidateNested({ each: true })
  @Type(() => Number)
  subProductsIds: number[]; // Array of IDs of sub-products (optional)

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => RelationType)
  @ValidateNested()
  category: RelationType;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateProductPdvDto)
  productPdv: CreateProductPdvDto[];
}
