import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  IRelationType,
  TransformIdToRelation,
} from 'src/common/decorators/relation.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => IRelationType)
  categoryMainCategory?: IRelationType;

  @IsOptional()
  @Type(() => IRelationType)
  company: IRelationType;
}
