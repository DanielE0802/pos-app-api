import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IRelationType } from 'src/common/decorators/relation.decorator';

export class CreateBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => IRelationType)
  company: IRelationType;
}
