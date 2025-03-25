import { Injectable, NotFoundException, ForbiddenException, forwardRef, Inject } from '@nestjs/common';
import { QuestRepository } from 'src/database/quest.repository';
import { CreateQuestDto } from './dto/quest.create.dto';
import { Category, Quest, User } from '@prisma/client';
import { UpdateQuestDto } from './dto/quest.update.dto';
import { MediaService } from 'src/media/media.service';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { UserQuestProgressService } from 'src/user-quest-progress/user-quest-progress.service';
import { UserAnswerService } from 'src/user-answer/user-answer.service';
import { QuestGateway } from './quest.gateway';


@Injectable()
export class QuestService {
  private userTasks: { [userId: string]: string } = {};

  constructor(
    private questRepository: QuestRepository, 
    private mediaService: MediaService,
    @Inject(forwardRef(() => QuestTaskService))
    private questTaskService: QuestTaskService,
    @Inject(forwardRef(() => UserQuestProgressService))
    private userQuestProgressService: UserQuestProgressService,
    private userAnswerService: UserAnswerService,
    private questGateway: QuestGateway,
  ) {}

  async getAllPublicQuests(filter?: { title?: string; category?: Category; difficulty?: number }): Promise<Quest[]> {
    return this.questRepository.findAllPublic(filter);
  }

  async getMyQuests(userId: string, filter?: { title?: string; category?: Category; difficulty?: number }): Promise<Quest[]> {
    return this.questRepository.findMyQuests(userId, filter);
  }

  async findQuestById(id: string): Promise<Quest> {
    const quest = await this.questRepository.findById(id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }
    return quest;
  }

  async startQuest(userId: string, questId: string) {
    let progress = await this.userQuestProgressService.findLastProgress(userId, questId);
    const currentTaskId = progress.currentTaskId;
    if (!currentTaskId) throw new NotFoundException('Task not found');
    if (!progress) {
      const firstTask = await this.questTaskService.findFirstTask(questId);
      if (!firstTask) throw new NotFoundException('No tasks found for this quest');

      progress = await this.userQuestProgressService.create(userId, firstTask.id);
    }
    this.userTasks[userId] = currentTaskId;

    await this.processTask(userId, questId);
  }

  private async processTask(userId: string, questId: string) {
    const currentTaskId = this.userTasks[userId];
    if (!currentTaskId) return;
    let task = await this.questTaskService.findTaskById(currentTaskId);
    if (!task) throw new NotFoundException('Task not found');

    this.questGateway.sendTask(userId, questId, task);

    this.questGateway.onAnswerReceived(async (receivedUserId, receivedTaskId, answer) => {
      if (receivedUserId !== userId || receivedTaskId !== task.id) return;

      await this.userAnswerService.create(userId, task.id, answer);

      const nextTask = await this.questTaskService.findFirstTask(questId, task.order);
      if (!nextTask) {
        await this.userQuestProgressService.completeProgress(userId, questId);
        this.questGateway.sendQuestCompleted(userId, questId);
        return;
      }
      await this.userQuestProgressService.progressNewTask(userId, nextTask.id);
      this.processTask(userId, questId);
    });
  }

  async createQuest(data: CreateQuestDto, authorId: string, file?: Express.Multer.File): Promise<Quest> {
    const quest = await this.questRepository.create(data, authorId);
    if (file) {
      const image = await this.mediaService.uploadImage(file, {'questId': quest.id})
    }
    const result = await this.questRepository.findById(quest.id);
    if (!result) {
      throw new NotFoundException('Quest not found');
    }
    return result;
  }

  async updateQuest(id: string, data: UpdateQuestDto, file?: Express.Multer.File): Promise<Quest> {
    const quest = await this.findQuestById(id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }
    if (file) {
      await this.mediaService.uploadImage(file, {'questId': quest.id});
    }
    return this.questRepository.update(id, data);
  }

  async deleteQuest(id: string): Promise<Quest> {
    const quest = await this.questRepository.findById(id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }
    return this.questRepository.delete(id);
  }
}
