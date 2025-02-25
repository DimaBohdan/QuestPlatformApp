import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Type } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';

export function IsOwner<T extends keyof PrismaService, K extends string>(
  model: T,
  userField: K
): Type<CanActivate> {
  @Injectable()
  class Guard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      if (!user) {
        throw new ForbiddenException('You must be logged in.');
      }

      const entityId = request.params.id;
      if (!entityId) {
        throw new ForbiddenException(`Missing required identifier: id`);
      }

      const entity = await (this.prisma[model] as any).findUnique({
        where: { id: entityId },
      });

      if (!entity) {
        throw new ForbiddenException(`${String(model)} not found.`);
      }

      const isOwner = entity[userField] === user.id;
      console.log(entity);
      console.log(entity[userField]);
      console.log(user);
      if (!isOwner) {
        throw new ForbiddenException(`You do not own this ${String(model)}.`);
      }

      return true;
    }
  }

  return Guard;
}
