import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class IdToRelation {
  @ApiProperty()
  @ValidateIf((value) => value.id !== null)
  @IsNotEmpty()
  @IsUUID()
  id: string | null;
}

export function TransformIdToRelation() {
  return Transform(({ value }) => {
    return { id: value };
  });
}
