import { PartialType } from '@nestjs/mapped-types';
import { CreatePdvDto } from './create-warehouse.dto';

export class UpdatePdvDto extends PartialType(CreatePdvDto) {}
