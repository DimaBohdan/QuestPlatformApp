import { Body, Controller, Param, Patch, Post, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestTask } from '@prisma/client';
import { QuestionTaskDTO } from 'src/quest-task/dto/question.task.dto';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { IQuestControllerTask } from 'utils/interfaces/quest-controller-task.interface';
import { FindOnMapTaskService } from './find-on-map-task.service';

@ApiTags('Find On Map Task')
@Controller('find-on-map-task')
export class FindOnMapTaskController implements IQuestControllerTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly findOnMapTaskService: FindOnMapTaskService) {}

  @Post(':questId')
  @ApiOperation({ summary: 'Create new Find on map task' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @ApiBody({ type: QuestionTaskDTO })  
  async createTask(
    @Param('questId') questId: string,
    @Body() question: QuestionTaskDTO,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<QuestTask> {
    return this.taskService.createTask(questId, { ...question, type:'FIND_ON_MAP', }, file);
  }

  @Patch('save/:taskId')
  @ApiOperation({ summary: 'Save new Find on map task' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  async saveTask(
    @Param('taskId') taskId: string,
  ): Promise<QuestTask> {
    return this.findOnMapTaskService.saveTask(taskId);
  }
}