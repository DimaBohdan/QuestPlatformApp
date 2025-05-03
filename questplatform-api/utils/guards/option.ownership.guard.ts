import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { OptionService } from "src/services/option.service";
import { QuestTaskService } from "src/services/quest-task.service";
import { QuestService } from "src/services/quest.service";
import { IS_PUBLIC_KEY } from "utils/decorators/public.decorator";
import { RequestWithUser } from "utils/types/RequestWithUser";

@Injectable()
export class OptionOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly questService: QuestService,
    private readonly optionService: OptionService,
    private readonly questTaskService: QuestTaskService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<RequestWithUser & { permissionLevel?: string }>();
    const user = request.user;
    const optionId = request.params['optionId'];
    if (request.permissionLevel === 'user:edit:any') return true;
    if (request.permissionLevel === 'user:edit:own') {
      const option = await this.optionService.getOptionById(optionId);
      const task = await this.questTaskService.findTaskById(option.taskId);
      const quest = await this.questService.findQuestById(task.questId);
      return quest.id === user.id;
    }
    return false;
  }
}
