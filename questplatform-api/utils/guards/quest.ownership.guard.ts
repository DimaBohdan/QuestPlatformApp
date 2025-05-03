import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { QuestService } from "src/services/quest.service";
import { IS_PUBLIC_KEY } from "utils/decorators/public.decorator";
import { RequestWithUser } from "utils/types/RequestWithUser";

@Injectable()
export class QuestOwnershipGuard implements CanActivate {
  constructor(
    private readonly questService: QuestService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<RequestWithUser & { permissionLevel?: string }>();
    const user = request.user;
    const questId = request.params['questId'];
    if (request.permissionLevel === 'user:edit:any') return true;
    if (request.permissionLevel === 'user:edit:own') {
      const quest = await this.questService.findQuestById(questId);
      return quest.authorId === user.id;
    }
    return false;
  }
}
