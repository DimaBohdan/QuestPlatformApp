import { Body, Controller, Param, Patch, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { QuestTaskService } from 'src/services/quest-task.service';
import { SingleChoiceTaskService } from '../services/single-choice-task.service';
import { QuestTask, QuestTaskType } from '@prisma/client';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestionTaskDTO } from 'src/dto/question.task.dto';
import { IQuestControllerTask } from 'utils/interfaces/quest-controller-task.interface';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { QuestOwnershipGuard } from 'utils/guards/quest.ownership.guard';
import { QuestTaskOwnershipGuard } from 'utils/guards/quest-task.ownership.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';

@ApiTags('Single Choice Task')
@Controller('single-choice-task')
@UseGuards(JwtAuthGuard, PermissionsGuard, QuestOwnershipGuard, QuestTaskOwnershipGuard)
export class SingleChoiceTaskController implements IQuestControllerTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly singleChoiceTaskService: SingleChoiceTaskService) {}

  @Post(':questId')
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Create new single choice task' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @ApiBody({ type: QuestionTaskDTO })  
  async createTask(
    @Param('questId') questId: string,
    @Body() question: QuestionTaskDTO,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<QuestTask> {
    return this.taskService.createTask(questId, { ...question, type: QuestTaskType.SINGLE_CHOICE, }, file);
  }

  @Patch('save/:taskId')
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Save new single choice task' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  async saveTask(
    @Param('taskId') taskId: string,
  ): Promise<QuestTask> {
    return this.singleChoiceTaskService.saveTask(taskId);
  }
}
