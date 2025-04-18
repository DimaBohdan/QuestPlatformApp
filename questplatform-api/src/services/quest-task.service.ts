import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Quest, QuestTask, QuestTaskType } from '@prisma/client';
import { MediaService } from 'src/services/media.service';
import { QuestTaskRepository } from 'src/database/task.repository';
import { QuestService } from 'src/services/quest.service';
import { UpdateQuestTaskDto } from '../dto/update.quest-task.dto';
import { CreateBaseQuestTaskDto } from '../dto/create.base-quest-task.dto';
import { TaskCleanerRegistry } from 'utils/strategies/task-cleaner.pool';

@Injectable()
export class QuestTaskService {
  constructor(
    private taskRepository: QuestTaskRepository,
    @Inject(forwardRef(() => QuestService))
    private questService: QuestService,
    private mediaService: MediaService,
    private taskCleanerRegistry: TaskCleanerRegistry,
  ) {}

  async findTaskById(id: string): Promise<QuestTask> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findTaskByIndex(questId: string, index: number): Promise<QuestTask> {
    const task = await this.taskRepository.findTaskByIndex(questId, index);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findTasksByQuest(questId: string): Promise<QuestTask[]> {
    await this.questService.findQuestById(questId);
    return await this.taskRepository.findTasksByQuest(questId);
  }

  async createTask(questId: string, data: CreateBaseQuestTaskDto, file?: Express.Multer.File): Promise<QuestTask> {
    const quest = await this.questService.findQuestById(questId);
    const taskOrder = quest.taskQuantity++;
    const task = await this.taskRepository.create(questId, taskOrder, data);
    if (file) {
      await this.mediaService.uploadImage(file, {'taskId': task.id})
    }
    const result = await this.findTaskById(task.id);
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }

  async saveTask(taskId: string): Promise<QuestTask> {
    await this.findTaskById(taskId);
    return await this.taskRepository.save(taskId);
  }

  async updateTaskOrder(id: string, order: number): Promise<void> {
    const task = await this.findTaskById(id);
    const quest = await this.questService.findQuestById(task.questId)
    if (order < 1 || order > quest.taskQuantity) throw new NotFoundException('Invalid order provided');
    await this.taskRepository.updateTaskOrder(task, order);
  }

  async updateTask(id: string, data: UpdateQuestTaskDto, file?: Express.Multer.File): Promise<QuestTask> {
    const task = await this.findTaskById(id);
    if (file) {
      await this.mediaService.uploadImage(file, {'taskId': task.id});
    }
    if (data.type && data.type !== task.type) {
      await this.clearIncompatibleData(id, task.type);
    }
    return this.taskRepository.update(id, data);
  }

  private async clearIncompatibleData(taskId: string, oldType: QuestTaskType): Promise<void> {
    const cleaner = this.taskCleanerRegistry.getStrategy(oldType);
    await cleaner.clear(taskId);
  }

  async clearTextAnswer(taskId: string): Promise<void> {
    await this.findTaskById(taskId);
    await this.taskRepository.clearTextAnswer(taskId);
  }

  async deleteTask(id: string): Promise<QuestTask> {
    const task = await this.findTaskById(id);
    const quest = await this.questService.findQuestById(task.questId);
    return this.taskRepository.deleteById(id, quest.id);
  }
}
