import { Body, Controller, Param, Patch, Post, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { IQuestControllerTask } from 'utils/interfaces/quest-controller-task.interface';
import { MultipleChoiceTaskService } from './multiple-choice-task.service';
import { QuestionTaskDTO } from 'src/quest-task/dto/question.task.dto';
import { QuestTask } from '@prisma/client';

@ApiTags('Multiple Choice Task')
@Controller('multiple-choice-task')
export class MultipleChoiceTaskController implements IQuestControllerTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly singleChoiceTaskService: MultipleChoiceTaskService) {}

  @Post(':questId')
  @ApiOperation({ summary: 'Create new multiple choice task' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @ApiBody({ type: QuestionTaskDTO })  
  async createTask(
    @Param('questId') questId: string,
    @Body() question: QuestionTaskDTO,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<QuestTask> {
    return this.taskService.createTask(questId, { ...question, type:'MULTIPLE_CHOICE', }, file);
  }

  @Patch('save/:taskId')
  @ApiOperation({ summary: 'Save new multiple choice task' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  async saveTask(
    @Param('taskId') taskId: string,
  ): Promise<QuestTask> {
    return this.singleChoiceTaskService.saveTask(taskId);
  }
}
