import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../utils/role-decorator';
import { Roles } from './roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    // getting values from jwt token
    const { user } = context.switchToHttp().getRequest();

    // roles are set during jwt creation
    const userRoles = user.roles;
    if (userRoles.includes(Roles.ROLE_ADMIN)) return true;
    return requiredRoles.some((role) => userRoles?.includes(role));
  }
}
