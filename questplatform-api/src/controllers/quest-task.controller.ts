import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { QuestTask } from '@prisma/client';
import { QuestTaskService } from 'src/services/quest-task.service';
import { UpdateQuestTaskDto } from '../dto/update.quest-task.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { QuestTaskOwnershipGuard } from 'utils/guards/quest-task.ownership.guard';
import { QuestOwnershipGuard } from 'utils/guards/quest.ownership.guard';

@ApiTags('Task')
@Controller('quest-task')
@UseGuards(JwtAuthGuard)
export class QuestTaskController {
  constructor(private readonly questTaskService: QuestTaskService) {}

  @ApiOperation({ summary: 'Get task by questId' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @Get(':questId/quest')
  async getTasksByQuest(@Param('questId') questId: string): Promise<QuestTask[]> {
    return this.questTaskService.findTasksByQuest(questId);
  }

  @UseGuards(PermissionsGuard, QuestOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @Get('stream/:questId')
  async streamTasks(
    @Param('questId') questId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.questTaskService.streamQuestTasks(questId, res);
  }

  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Update task order by Id' })
  @ApiParam({ name: 'taskId', description: 'Update ID' })
  @ApiParam({ name: 'order', description: 'Order number' })
  @Put(':taskId/:order')
  async updateOrder(
    @Param('taskId') id: string,
    @Param('order', ParseIntPipe) order: number,
  ): Promise<void> {
    return this.questTaskService.updateTaskOrder(id, order);
  }

  @Permissions('user:access:own')
  @Permissions()
  @ApiOperation({ summary: 'Get task by id' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @Get(':taskId')
  async getTaskById(@Param('taskId') taskId: string): Promise<QuestTask> {
    return this.questTaskService.findTaskById(taskId);
  }

  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Update task by Id' })
  @ApiParam({ name: 'taskId', description: 'Update ID' })
  @ApiBody({ type: UpdateQuestTaskDto })
  @Patch(':taskId')
  async updateTask(
    @Param() id: string,
    @Body() data: UpdateQuestTaskDto,
  ) {
    return this.questTaskService.updateTask(id, { ...data});
  }

  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Delete task by Id' })
  @ApiParam({ name: 'taskId', description: 'Delete ID' })
  @Delete(':taskId')
  async deleteTask(
    @Param('taskId') id: string,
  ): Promise<QuestTask> {
    return this.questTaskService.deleteTask(id);
  }
}
