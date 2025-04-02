import { Body, Controller, Delete, Param, Patch, Post, UploadedFile } from '@nestjs/common';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { SingleChoiceTaskService } from './single-choice-task.service';
import { QuestTask } from '@prisma/client';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestionTaskDTO } from 'src/quest-task/dto/question.task.dto';
import { IQuestControllerTask } from 'utils/interfaces/quest-controller-task.interface';

@ApiTags('Single Choice Task')
@Controller('single-choice-task')
export class SingleChoiceTaskController implements IQuestControllerTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly singleChoiceTaskService: SingleChoiceTaskService) {}

  @Post(':questId')
  @ApiOperation({ summary: 'Create new single choice task' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @ApiBody({ type: QuestionTaskDTO })  
  async createTask(
    @Param('questId') questId: string,
    @Body() question: QuestionTaskDTO,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<QuestTask> {
    return this.taskService.createTask(questId, { ...question, type:'SINGLE_CHOICE', }, file);
  }

  @Patch('save/:taskId')
  @ApiOperation({ summary: 'Save new single choice task' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  async saveTask(
    @Param('taskId') taskId: string,
  ): Promise<QuestTask> {
    return this.singleChoiceTaskService.saveTask(taskId);
  }
}
