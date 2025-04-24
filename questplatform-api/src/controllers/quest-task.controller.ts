import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Option, QuestTask } from '@prisma/client';
import { QuestTaskService } from 'src/services/quest-task.service';
import { UpdateQuestTaskDto } from '../dto/update.quest-task.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CaslForbiddenError } from 'utils/decorators/casl-forbidden-error.decorator';
import { AppAbility, CaslForbiddenErrorI } from 'utils/permissions/casl-rules.factory';
import { subject } from '@casl/ability';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { Response } from 'express';

@ApiTags('Task')
@Controller('quest-task')
export class QuestTaskController {
  constructor(private readonly questTaskService: QuestTaskService) {}

  @ApiOperation({ summary: 'Get task by id' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @Get(':taskId')
  async getTaskById(@Param('taskId') taskId: string): Promise<QuestTask> {
    return this.questTaskService.findTaskById(taskId);
  }

  @ApiOperation({ summary: 'Get task by questId' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @Get(':questId/quest')
  async getTasksByQuest(@Param('questId') questId: string): Promise<QuestTask[]> {
    return this.questTaskService.findTasksByQuest(questId);
  }

  @Get('stream/:questId')
  async streamTasks(
    @Param('questId') questId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.questTaskService.streamQuestTasks(questId, res);
  }

  @ApiOperation({ summary: 'Update task by Id' })
  @ApiParam({ name: 'id', description: 'Update ID' })
  @ApiBody({ type: UpdateQuestTaskDto })
  @Patch(':id')
  async updateTask(
    @Param() id: string,
    @Body() data: UpdateQuestTaskDto,
    @Req() req: RequestWithUser,
  ) {
    return this.questTaskService.updateTask(id, { ...data});
  }

  @ApiOperation({ summary: 'Update task order by Id' })
  @ApiParam({ name: 'id', description: 'Update ID' })
  @ApiParam({ name: 'order', description: 'Order number' })
  @Put(':id/:order')
  async updateOrder(
    @Param('id') id: string,
    @Param('order', ParseIntPipe) order: number,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  ): Promise<void> {
    const task = await this.questTaskService.findTaskById(id);
    forbiddenError.throwUnlessCan('manage', subject('QuestTask', task));
    return this.questTaskService.updateTaskOrder(id, order);
  }

  @ApiOperation({ summary: 'Delete task by Id' })
  @ApiParam({ name: 'id', description: 'Delete ID' })
  @Delete(':id')
  async deleteTask(
    @Param() id: string,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  ): Promise<QuestTask> {
    const task = await this.questTaskService.findTaskById(id);
    forbiddenError.throwUnlessCan('manage', subject('QuestTask', task));
    return this.questTaskService.deleteTask(id);
  }
}
