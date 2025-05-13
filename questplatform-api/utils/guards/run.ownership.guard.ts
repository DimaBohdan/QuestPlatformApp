import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { QuestRunService } from "src/services/quest-run.service";
import { IS_PUBLIC_KEY } from "utils/decorators/public.decorator";
import { RequestWithUser } from "utils/types/RequestWithUser";

@Injectable()
export class QuestRunOwnershipGuard implements CanActivate {
  constructor(
    private readonly questRunService: QuestRunService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<RequestWithUser & { permissionLevel?: string }>();
    const user = request.user;
    const questId = request.params['runId'];
    if (request.permissionLevel === 'host:run:any') return true;
    if (request.permissionLevel === 'host:run:own') {
      const run = await this.questRunService.getQuestRunById(questId);
      return run.createdById === user.id;
    }
    return false;
  }
}
