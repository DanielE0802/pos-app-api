import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdToRelation {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export function TransformIdToRelation() {
  return Transform(({ value }) => {
    return { id: value };
  });
}
