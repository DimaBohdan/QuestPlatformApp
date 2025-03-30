import { Body, Controller, Delete, Param, Patch, Post, UploadedFile } from '@nestjs/common';
import { IQuestTask } from 'utils/interfaces/quest-task.interface';
import { CreateSingleChoiceTaskDto } from './dto/single-choice-task.create.dto';
import { UpdateSingleChoiceTaskDto } from './dto/single-choice-task.update.dto';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { SingleChoiceTaskService } from './single-choice-task.service';
import { QuestTask } from '@prisma/client';
import { CreateBaseQuestTaskDto } from 'src/quest-task/dto/create.base-quest-task.dto';

@Controller('single-choice-task')
export class SingleChoiceTaskController implements IQuestTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly singleChoiceTaskService: SingleChoiceTaskService) {}

  @Post(':questId')
  async createTask(
    @Param() questId: string,
    @Body() question: string,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<QuestTask> {
    return this.taskService.createTask(questId, { question, type:'SINGLE_CHOICE', }, file);
  }

  @Post(':questId')
  async saveTask(
    @Param() taskId: string,
  ): Promise<QuestTask> {
    return this.singleChoiceTaskService.saveTask(taskId);
  }
  
  validateTask(userAnswer: string): boolean {
    console.log('Validation for SINGLE_CHOICE task');
    return true;
  }
}
