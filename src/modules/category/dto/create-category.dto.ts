import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  RelationType,
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
  @Type(() => RelationType)
  categoryMainCategory?: RelationType;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => RelationType)
  company: RelationType;
}
