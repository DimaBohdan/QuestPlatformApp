import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestTask } from '@prisma/client';
import { OptionService } from 'src/option/option.service';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { IQuestServiceTask } from 'utils/interfaces/quest-service-task.interface';

@Injectable()
export class TextFieldTaskService implements IQuestServiceTask {
  constructor(
    private taskService: QuestTaskService,
  ) {}

  async saveTask(taskId: string): Promise<QuestTask> {
    const task = await this.taskService.findTaskById(taskId);
    if (task.textAnswer.length > 0) {
      return await this.taskService.saveTask(taskId);
    }
    else {
      throw new BadRequestException('Invalid data for this type of task provided');
    }
  }
}
