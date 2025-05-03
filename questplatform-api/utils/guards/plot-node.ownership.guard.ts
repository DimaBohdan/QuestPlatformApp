import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PlotNodeService } from "src/services/plot-node.service";
import { QuestTaskService } from "src/services/quest-task.service";
import { QuestService } from "src/services/quest.service";
import { IS_PUBLIC_KEY } from "utils/decorators/public.decorator";
import { RequestWithUser } from "utils/types/RequestWithUser";

@Injectable()
export class PlotNodeOwnershipGuard implements CanActivate {
  constructor(
    private readonly questService: QuestService,
    private readonly questTaskService: QuestTaskService,
    private readonly plotNodeService: PlotNodeService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<RequestWithUser & { permissionLevel?: string }>();
    const user = request.user;
    const nodeId = request.params['nodeId'];
    if (request.permissionLevel === 'user:edit:any') return true;
    if (request.permissionLevel === 'user:edit:own') {
      const node = await this.plotNodeService.getPlotNodeById(nodeId)
      const task = await this.questTaskService.findTaskById(node.taskId);
      const quest = await this.questService.findQuestById(task.questId);
      return quest.id === user.id;
    }
    return false;
  }
}