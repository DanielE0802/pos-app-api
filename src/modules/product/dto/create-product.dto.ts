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

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toString())
  @ApiProperty()
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  priceSale: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  priceBase: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  quantityStock: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => RelationType)
  @ValidateNested()
  brand: RelationType;

  @IsOptional()
  @Type(() => RelationType)
  @ValidateNested()
  @ApiPropertyOptional()
  productMainProduct: RelationType; // ID of the main product (optional)

  @IsOptional()
  @IsNumber({}, { each: true })
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional()
  subProductsIds: number[]; // Array of IDs of sub-products (optional)

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => RelationType)
  @ValidateNested()
  category: RelationType;

  @ApiProperty()
  @IsNotEmpty()
  // @ValidateNested({ each: true })
  @Type(() => CreateProductPdvDto)
  productPdv: CreateProductPdvDto[];
}
