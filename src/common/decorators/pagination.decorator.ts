import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsPositive, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export function PagsValidator(params: { min: number }) {
  return applyDecorators(
    IsOptional(),
    IsPositive(),
    Min(params.min),
    Type(() => Number),
    IsNumber(),
  );
}
