import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

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
