import { Body, Controller, Param, Patch, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestTaskService } from 'src/services/quest-task.service';
import { IQuestControllerTask } from 'utils/interfaces/quest-controller-task.interface';
import { QuestionTaskDTO } from 'src/dto/question.task.dto';
import { QuestTask } from '@prisma/client';
import { TextFieldTaskService } from '../services/text-field-task.service';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { QuestOwnershipGuard } from 'utils/guards/quest.ownership.guard';
import { QuestTaskOwnershipGuard } from 'utils/guards/quest-task.ownership.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';

@ApiTags('Text Field Choice Task')
@Controller('text-field-task')
@UseGuards(JwtAuthGuard, PermissionsGuard, QuestOwnershipGuard, QuestTaskOwnershipGuard)
export class TextFieldTaskController implements IQuestControllerTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly textFieldTaskService: TextFieldTaskService) {}

  @Post(':questId')
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Create new text field task' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @ApiBody({ type: QuestionTaskDTO })  
  async createTask(
    @Param('questId') questId: string,
    @Body() question: QuestionTaskDTO,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<QuestTask> {
    return this.taskService.createTask(questId, { ...question, type:'TEXT_FIELD', }, file);
  }

  @Patch('save/:taskId')
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Save new single choice task' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  async saveTask(
    @Param('taskId') taskId: string,
  ): Promise<QuestTask> {
    return this.textFieldTaskService.saveTask(taskId);
  }
}
