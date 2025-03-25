import { Injectable } from '@nestjs/common';
import { CreateSingleChoiceTaskDto } from './dto/single-choice-task.create.dto';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { SingleChoiceTask } from '@prisma/client';

@Injectable()
export class SingleChoiceTaskService {
  constructor(
    private taskRepository: QuestTaskRepository,
    private taskService: QuestTaskService) {}
  
  async createTask(questId: string, data: CreateSingleChoiceTaskDto, file?: Express.Multer.File): Promise<Quest> {
    await this.taskService.createTask(questId, { ...data, type: 'SINGLE_CHOICE' }, file);
    
  }
}
