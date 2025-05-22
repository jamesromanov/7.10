import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/users/user.role';
import { ROLES_KEY } from '../roles';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflecTor: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflecTor.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) return false;
      const { user } = GqlExecutionContext.create(context).getContext().req;
      if (!requiredRoles.includes(user.role))
        throw new UnauthorizedException('You dont have rights to do that');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
}
