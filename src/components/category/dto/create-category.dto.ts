import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IRelationType } from 'src/common/decorators/relation.decorator';
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
