import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSingleChoiceTaskDto } from './dto/single-choice-task.create.dto';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { QuestTask } from '@prisma/client';
import { OptionService } from 'src/option/option.service';
import { IQuestServiceTask } from 'utils/interfaces/quest-service-task.interface';

@Injectable()
export class SingleChoiceTaskService implements IQuestServiceTask {
  constructor(
    private taskService: QuestTaskService,
    private optionService: OptionService,
  ) {}

  async saveTask(taskId: string): Promise<QuestTask> {
    const options = await this.optionService.getOptionsByTaskId(taskId);
    const answers = await this.optionService.getCorrectAnswers(taskId);
    if (options.length >= 2 && answers.length == 1) {
      return await this.taskService.saveTask(taskId);
    }
    else {
      throw new BadRequestException('Invalid data for this type of task provided');
    }
  }
}
