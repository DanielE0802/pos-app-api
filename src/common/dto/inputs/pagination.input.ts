import { Field, InputType } from '@nestjs/graphql';
import { PagsValidator } from '../../decorators/pagination.decorator';

@InputType()
export class PaginationInput {
  @Field()
  @PagsValidator({ min: 1 })
  limit?: number;

  @Field()
  @PagsValidator({ min: 0 })
  offset?: number;
}
