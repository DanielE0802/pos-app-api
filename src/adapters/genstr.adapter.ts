import { Injectable } from '@nestjs/common';
import * as genstr from '@supercharge/strings';

@Injectable()
export class GenstrService {
  /**
   * * Service that returns a token for validations.
   * @param size Length of the token to be returned
   * @returns
   */
  generate(size: number): string {
    return genstr.Str().random(size);
  }
}
