import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class IRelationType {
  @IsNotEmpty()
  @IsUUID()
  @ValidateIf((value) => value.id !== null)
  id: string | null;
}

export function TransformIdToRelation(value: any) {
  return Transform(() => {
    return { id: value };
  });
}
