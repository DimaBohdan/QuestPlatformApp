import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CoordinateService } from "src/services/coordinate.service";
import { OptionService } from "src/services/option.service";
import { QuestTaskService } from "src/services/quest-task.service";
import { QuestService } from "src/services/quest.service";
import { IS_PUBLIC_KEY } from "utils/decorators/public.decorator";
import { RequestWithUser } from "utils/types/RequestWithUser";

@Injectable()
export class CoordinateOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly questService: QuestService,
    private readonly questTaskService: QuestTaskService,
    private readonly coordinateService: CoordinateService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<RequestWithUser & { permissionLevel?: string }>();
    const user = request.user;
    const coordinateId = request.params['coordinateId'];
    if (request.permissionLevel === 'user:edit:any') return true;
    if (request.permissionLevel === 'user:edit:own') {
      const coordinate = await this.coordinateService.getCoordinateById(coordinateId);
      if (!coordinate.findOnTaskId) return true;
      const task = await this.questTaskService.findTaskById(coordinate.findOnTaskId);
      const quest = await this.questService.findQuestById(task.questId);
      return quest.id === user.id;
    }
    return false;
  }
}