import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestTask } from '@prisma/client';
import { CoordinateService } from 'src/coordinate/coordinate.service';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { IQuestServiceTask } from 'utils/interfaces/quest-service-task.interface';

@Injectable()
export class FindOnMapTaskService implements IQuestServiceTask {
  constructor(
    private taskService: QuestTaskService,
    private coordinateService: CoordinateService,
  ) {}

  async saveTask(taskId: string): Promise<QuestTask> {
    const coordinate = await this.coordinateService.getCoordinateByTask(taskId);
    if (
        coordinate.positionX < -90 || coordinate.positionY < -180 || 
        coordinate.positionX > 90 || coordinate.positionY > 180 ||
        coordinate.radius >= 0
    ) {
        throw new BadRequestException('Coordinate is out of bounds');
    }
    return await this.taskService.saveTask(taskId);
  }
}
