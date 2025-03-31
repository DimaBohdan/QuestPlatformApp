import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Option, QuestTask } from '@prisma/client';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { UpdateQuestTaskDto } from './dto/update.quest-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('quest-task')
export class QuestTaskController {
  constructor(private readonly questTaskService: QuestTaskService) {}

  @Get(':taskId')
  async getTaskById(@Param('taskId') taskId: string): Promise<QuestTask> {
    return this.questTaskService.findTaskById(taskId);
  }

  @Get(':questId')
  async getTasksByQuest(@Param('questId') questId: string): Promise<QuestTask[]> {
    return this.questTaskService.findTasksByQuest(questId);
  }

  @Patch(':id')
  async updateTask(
    @Param() id: string,
    @Body() data: UpdateQuestTaskDto,
  ) {
    return this.questTaskService.updateTask(id, { ...data});
  }

  @Put(':id/order')
  async updateOrder(
    @Param('id') id: string,
    @Body() { order }: { order: number },
  ): Promise<void> {
    return this.questTaskService.updateTaskOrder(id, order);
  }

  @Delete(':id')
  async deleteTask(@Param() id: string): Promise<QuestTask> {
    return this.questTaskService.deleteTask(id);
  }

  validateTask(userAnswer: string): boolean {
    console.log('Validation for SINGLE_CHOICE task');
    return true;
  }
}
