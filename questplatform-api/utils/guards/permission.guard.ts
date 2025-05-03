import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'utils/decorators/permissions.decorator';
import { PermissionService } from 'src/services/permission.service';
import { IS_PUBLIC_KEY } from 'utils/decorators/public.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions?.length) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.id) throw new ForbiddenException('Unauthorized');
    const userPermissions = await this.permissionService.getUserPermissions(user.id);
    const matchedPermission = requiredPermissions.find((perm) =>
      userPermissions.includes(perm),
    );
    if (!matchedPermission) throw new ForbiddenException('Insufficient permissions');
    request.permissionLevel = matchedPermission;
    return true;
  }
}
