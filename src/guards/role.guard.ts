import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(    private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let user=request.user

    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (roles.includes(user.role)){
      console.log(roles)
      return true;
    }

    return false;
  }
}
