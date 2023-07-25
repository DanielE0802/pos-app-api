import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class RelationType {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  @ValidateIf((value) => value.id !== null)
  id: string | null;
}

export function TransformIdToRelation() {
  return Transform(({ value }) => {
    return { id: value };
  });
}
