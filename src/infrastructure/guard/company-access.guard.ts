import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CompanyAccessGuard implements CanActivate {
  private readonly _logger = new Logger(CompanyAccessGuard.name);

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const companyId = request.params.companyId || request.body.companyId;

    this._logger.debug({ user, companyId });
    if (!user || !companyId) {
      this._logger.error('Falta información de autenticación');
      throw new BadRequestException();
    }

    const userHasCompanyAccess = user.company.map((c) => c.id);

    if (!userHasCompanyAccess.includes(companyId)) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta compañía',
      );
    }

    return true;
  }
}
