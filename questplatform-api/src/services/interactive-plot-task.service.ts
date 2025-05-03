import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestTask } from '@prisma/client';
import { QuestTaskService } from './quest-task.service';
import { IQuestServiceTask } from 'utils/interfaces/quest-service-task.interface';
import { MediaService } from './media.service';
import { PlotNodeService } from './plot-node.service';
import { PlotChoiceService } from './plot-choice.service';

@Injectable()
export class InteractivePlotTaskService implements IQuestServiceTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly mediaService: MediaService,
    private readonly plotNodeService: PlotNodeService,
    private readonly plotChoiceService: PlotChoiceService,
  ) {}

  async saveTask(taskId: string): Promise<QuestTask> {
    const media = await this.mediaService.findMediaFile('taskId', taskId);
    const nodes = await this.plotNodeService.getPlotNodesByTaskId(taskId);
    if (!nodes.length) {
        throw new BadRequestException('Plot quest must contain at least one node');
    }
  
    const startNodes = nodes.filter(n => n.isStart);
    if (startNodes.length !== 1) {
      throw new BadRequestException('Plot quest must have exactly one start node');
    }
    const allNodeIds = new Set(nodes.map(n => n.id));
    for (const node of nodes) {
      const choices = await this.plotChoiceService.getChoicesByNode(node.id);
      for (const choice of choices) {
        if (choice.nextNodeId && !allNodeIds.has(choice.nextNodeId)) {
          throw new BadRequestException(`PlotChoice "${choice.id}" points to non-existent node`);
        }
      }
    }
    return await this.taskService.saveTask(taskId);
  }
}

