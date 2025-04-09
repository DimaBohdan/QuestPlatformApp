import { Body, Controller, Param, Patch, Post, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { IQuestControllerTask } from 'utils/interfaces/quest-controller-task.interface';
import { QuestionTaskDTO } from 'src/quest-task/dto/question.task.dto';
import { QuestTask } from '@prisma/client';
import { TextFieldTaskService } from './text-field-task.service';

@ApiTags('Text Field Choice Task')
@Controller('text-field-task')
export class TextFieldTaskController implements IQuestControllerTask {
  constructor(
    private readonly taskService: QuestTaskService,
    private readonly textFieldTaskService: TextFieldTaskService) {}

  @Post(':questId')
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
  @ApiOperation({ summary: 'Save new single choice task' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  async saveTask(
    @Param('taskId') taskId: string,
  ): Promise<QuestTask> {
    return this.textFieldTaskService.saveTask(taskId);
  }
}
