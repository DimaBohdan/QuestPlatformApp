import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Type, Inject } from '@nestjs/common';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  private readonly userModel = 'user';
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    const model = request.route.path.split('/')[1];
    if (!(model in this.prisma)) {
      throw new ForbiddenException(`Unknown model: ${model}`);
    }

    if (!user) {
      throw new ForbiddenException('You must be logged in.');
    }

    const entityId = request.params.id;
    if (!entityId) {
      throw new ForbiddenException(`Missing required identifier: id`);
    }

    const entity = await (this.prisma[model] as any).findUnique({
      where: { id: entityId },
      include: model !== this.userModel ? { user: true } : undefined,
    });

    if (!entity) {
        throw new ForbiddenException(`${String(model)} not found.`);
    }

    const isOwner =
      model === this.userModel ? entity.id === user.id : entity.user?.id === user.id;

    if (!isOwner) {
      throw new ForbiddenException(`You do not own this ${model}.`);
    }

    return true;
  }
}
