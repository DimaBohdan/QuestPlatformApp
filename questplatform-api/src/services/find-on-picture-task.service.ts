import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestTask } from '@prisma/client';
import { CoordinateService } from 'src/services/coordinate.service';
import { MediaService } from 'src/services/media.service';
import { QuestTaskService } from 'src/services/quest-task.service';
import { IQuestServiceTask } from 'utils/interfaces/quest-service-task.interface';

@Injectable()
export class FindOnPictureTaskService implements IQuestServiceTask {
  constructor(
    private taskService: QuestTaskService,
    private mediaService: MediaService,
    private coordinateService: CoordinateService,
  ) {}

  async saveTask(taskId: string): Promise<QuestTask> {
    const media = await this.mediaService.findMediaFile('taskId', taskId);
    const coordinate = await this.coordinateService.getCoordinateByTask(taskId);
    if (
        media.type !== 'IMAGE' ||
        media.width == null || media.height == null
    ) {
        throw new BadRequestException('Invalid media type or incorrect dimensions');
    }
    if (
        coordinate.positionX < 0 || coordinate.positionY < 0 || 
        coordinate.positionX >= media.width || coordinate.positionY >= media.height ||
        coordinate.radius >= 0
    ) {
        throw new BadRequestException('Coordinate is out of bounds or negative');
    }
    return await this.taskService.saveTask(taskId);
  }
}
