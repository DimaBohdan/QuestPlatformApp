import { Injectable, NotFoundException } from "@nestjs/common";
import { UserQuestProgress } from "@prisma/client";
import { QuestTaskRepository } from "src/database/task.repository";
import { UserQuestProgressRepository } from "src/database/user-quest-progress.repository";
import { QuestTaskService } from "src/quest-task/quest-task.service";

@Injectable()
export class UserQuestProgressService {
  constructor(
    private progressRepository: UserQuestProgressRepository,
    private taskService: QuestTaskService,
  ) {}

  async findLastProgress(userId: string, questId: string): Promise<UserQuestProgress> {
    const progress = await this.progressRepository.findLastProgress(userId, questId);
    if (!progress) {
        throw new NotFoundException('Progress not found');
    }
    return progress;
  }

  async progressNewTask(userId: string, taskId: string): Promise<UserQuestProgress[]> {
    const task = await this.taskService.findTaskById(taskId);
    return await this.progressRepository.progressNewTask(userId, task.questId, taskId);
  }

  async completeProgress(userId: string, questId: string): Promise<UserQuestProgress[]> {
    return await this.progressRepository.completeProgress(userId, questId);
  }

  async create(userId: string, currentTaskId: string): Promise<UserQuestProgress> {
    const task = await this.taskService.findTaskById(currentTaskId);
    return await this.progressRepository.create(userId, task.questId, currentTaskId);
  }
}
