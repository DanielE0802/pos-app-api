import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsPdvDto } from './create-products-pdv.dto';

export class UpdateProductsPdvDto extends PartialType(CreateProductsPdvDto) {}
