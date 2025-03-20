import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Quest, QuestTask } from '@prisma/client';
import { MediaService } from 'src/media/media.service';
import { QuestTaskRepository } from 'src/database/task.repository';
import { QuestService } from 'src/quest/quest.service';
import { UpdateQuestTaskDto } from './dto/update.quest-task.dto';
import { CreateQuestTaskDto } from './dto/create.quest-task.dto';

@Injectable()
export class QuestTaskService {
  constructor(
    private taskRepository: QuestTaskRepository,
    @Inject(forwardRef(() => QuestService))
    private questService: QuestService,
    private mediaService: MediaService,
  ) {}

  async findTaskById(id: string): Promise<QuestTask> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findTasksByQuest(questId: string): Promise<QuestTask[]> {
    return await this.taskRepository.findTasksByQuest(questId);
  }

  async findFirstTask(questId: string, minTaskOrder: number = 0): Promise<QuestTask> {
    const task = await this.taskRepository.findFirstTask(questId, minTaskOrder);
    if (!task) {
      throw new NotFoundException('No task found');
    }
    return task;
  }

  async createTask(questId: string, data: CreateQuestTaskDto, file?: Express.Multer.File): Promise<QuestTask> {
    const quest = await this.questService.findQuestById(questId);
    const taskOrder = quest.taskQuantity++;
    const task = await this.taskRepository.create(questId, taskOrder, data);
    if (file) {
      const image = await this.mediaService.uploadImage(file, {'taskId': task.id})
    }
    const result = await this.taskRepository.findById(task.id);
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }

  async updateTaskOrder(id: string, order: number): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    const quest = await this.questService.findQuestById(task.questId)
    if (order < 1 || order > quest.taskQuantity) throw new NotFoundException('Invalid order provided');
    await this.taskRepository.updateTaskOrder(task, order);
  }

  async updateTask(id: string, data: UpdateQuestTaskDto, file?: Express.Multer.File): Promise<QuestTask> {
    const task = await this.findTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (file) {
      await this.mediaService.uploadImage(file, {'taskId': task.id});
    }
    return this.taskRepository.update(id, data);
  }

  async deleteTask(id: string): Promise<QuestTask> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const quest = await this.questService.findQuestById(task.questId)
    return this.taskRepository.deleteById(id, quest.id);
  }
}
