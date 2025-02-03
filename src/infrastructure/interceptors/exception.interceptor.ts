import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedExceptionMsgs } from '../enums/exeption-codes.enum';

@Injectable()
export class AllyExceptionInterceptor implements NestInterceptor {
  private readonly _logger = new Logger(AllyExceptionInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let response = { success: false, acode: 1100, details: {} };

        if (error instanceof HttpException) {
          status = error.getStatus();
          const errorResponse: any = error.getResponse();

          const _acode =
            typeof errorResponse === 'string'
              ? errorResponse
              : errorResponse?.message || 'An error occurred';

          response = {
            success: false,
            acode: _acode,
            details:
              typeof errorResponse === 'object'
                ? {
                    ...errorResponse,
                    message:
                      UnauthorizedExceptionMsgs[Number(_acode)] ||
                      'Unknown acode',
                  }
                : {},
          };
          this._logger.error(
            JSON.stringify({
              ...response,
              path: context.switchToHttp().getRequest().url,
              timestamp: new Date().toISOString(),
            }),
          );
        } else {
          this._logger.error('Unexpected error:', { error });
        }

        return throwError(() => new HttpException(response, status));
      }),
    );
  }
}
