import { Body, Controller, Param, Patch, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestTask } from '@prisma/client';
import { QuestionTaskDTO } from 'src/dto/question.task.dto';
import { QuestTaskService } from 'src/services/quest-task.service';
import { IQuestControllerTask } from 'utils/interfaces/quest-controller-task.interface';
import { FindOnPictureTaskService } from '../services/find-on-picture-task.service';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { QuestOwnershipGuard } from 'utils/guards/quest.ownership.guard';
import { QuestTaskOwnershipGuard } from 'utils/guards/quest-task.ownership.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';

@ApiTags('Find On Picture Task')
@Controller('find-on-picture-task')
@UseGuards(JwtAuthGuard, PermissionsGuard, QuestOwnershipGuard, QuestTaskOwnershipGuard)
export class FindOnPictureTaskController implements IQuestControllerTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly findOnPictureTaskService: FindOnPictureTaskService) {}

  @Post(':questId')
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Create new Find on picture task' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @ApiBody({ type: QuestionTaskDTO })  
  async createTask(
    @Param('questId') questId: string,
    @Body() question: QuestionTaskDTO,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<QuestTask> {
    return this.taskService.createTask(questId, { ...question, type:'FIND_ON_PICTURE', }, file);
  }

  @Patch('save/:taskId')
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Save new Find on picture task' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  async saveTask(
    @Param('taskId') taskId: string,
  ): Promise<QuestTask> {
    return this.findOnPictureTaskService.saveTask(taskId);
  }
}