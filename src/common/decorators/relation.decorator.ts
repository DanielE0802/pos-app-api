import { Transform } from 'class-transformer';

export function TransformIdToRelation() {
  return Transform(({ value }) => {
    return { id: value };
  });
}
