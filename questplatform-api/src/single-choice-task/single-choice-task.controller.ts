import { Body, Controller, Delete, Param, Patch, Post, UploadedFile } from '@nestjs/common';
import { IQuestTask } from 'utils/interfaces/quest-task.interface';
import { CreateSingleChoiceTaskDto } from './dto/single-choice-task.create.dto';
import { UpdateSingleChoiceTaskDto } from './dto/single-choice-task.update.dto';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { SingleChoiceTaskService } from './single-choice-task.service';
import { SingleChoiceTask } from '@prisma/client';

@Controller('single-choice-task')
export class SingleChoiceTaskController implements IQuestTask {
  constructor(
    private readonly questTaskService: QuestTaskService,
    private readonly singleChoiceTaskService: SingleChoiceTaskService) {}

  @Post(':questId')
  async createTask(
    @Param() questId: string,
    @Body() data: CreateSingleChoiceTaskDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<SingleChoiceTask> {
    return this.singleChoiceTaskService.createTask(questId, { ...data, type: 'SINGLE_CHOICE' }, file);
  }

  @Patch(':id')
  async updateTask(
    @Param() id: string,
    @Body() data: UpdateSingleChoiceTaskDto
  ) {
    return this.questTaskService.updateTask(id, { ...data});
  }
  
  validateTask(userAnswer: string): boolean {
    console.log('Validation for SINGLE_CHOICE task');
    return true;
  }
}
