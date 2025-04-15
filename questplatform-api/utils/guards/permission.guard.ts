// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Request } from 'express';
// import { Reflector } from '@nestjs/core';
// import { PermissionService } from './permission.service'; // Импортируй свой сервис для проверки прав
// import { NoPermissionException } from '../../../exceptions/no-permission.exception';

// @Injectable()
// export class PermissionGuard implements CanActivate {

//   constructor(
//     private permissionService: PermissionService,
//     private reflector: Reflector,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();
//     const user = request.user;
//     const permissions = this.getPermissions(context);

//     for (const permission of permissions) {
//       if (user == null) {
//         return false;
//       }

//       const hasPermission = await this.permissionService.hasPermission(user.id, permission);
//       if (hasPermission) return true;
//     }
//     throw new NoPermissionException();
//   }

//   getPermissions(context: ExecutionContext): string[] {
//     return this.reflector.get<string[]>('permissions', context.getHandler()) || [];
//   }
// }
