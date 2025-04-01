import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { Option, QuestTask } from '@prisma/client';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { UpdateQuestTaskDto } from './dto/update.quest-task.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

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
  @Get(':questId')
  async getTasksByQuest(@Param('questId') questId: string): Promise<QuestTask[]> {
    return this.questTaskService.findTasksByQuest(questId);
  }

  @ApiOperation({ summary: 'Update task by Id' })
  @ApiParam({ name: 'id', description: 'Update ID' })
  @ApiBody({ type: UpdateQuestTaskDto })
  @Patch(':id')
  async updateTask(
    @Param() id: string,
    @Body() data: UpdateQuestTaskDto,
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
  ): Promise<void> {
    return this.questTaskService.updateTaskOrder(id, order);
  }

  @ApiOperation({ summary: 'Delete task by Id' })
  @ApiParam({ name: 'id', description: 'Delete ID' })
  @Delete(':id')
  async deleteTask(@Param() id: string): Promise<QuestTask> {
    return this.questTaskService.deleteTask(id);
  }

  validateTask(userAnswer: string): boolean {
    console.log('Validation for SINGLE_CHOICE task');
    return true;
  }
}
