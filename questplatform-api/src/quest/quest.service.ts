import { Injectable, NotFoundException, ForbiddenException, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { QuestRepository } from 'src/database/quest.repository';
import { CreateQuestDto } from './dto/quest.create.dto';
import { Category, Quest, QuestStatus, User } from '@prisma/client';
import { UpdateQuestDto } from './dto/quest.update.dto';
import { MediaService } from 'src/media/media.service';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { UserQuestProgressService } from 'src/user-quest-progress/user-quest-progress.service';
import { UserAnswerService } from 'src/user-answer/user-answer.service';
import { QuestGateway } from './quest.gateway';
import { QuestSortField } from './enums/QuestSortField.enum';
import { QuestSortOrder } from './enums/QuestSortOrder.enum';


@Injectable()
export class QuestService {

  constructor(
    private questRepository: QuestRepository, 
    private mediaService: MediaService,
    @Inject(forwardRef(() => QuestTaskService))
    private questTaskService: QuestTaskService,
  ) {}

  async getAllPublishedQuests(
    filter?: { title?: string; category?: Category; difficulty?: number },
    sort?: { sortBy?: QuestSortField, sortOrder?: QuestSortOrder }
  ): Promise<Quest[]> {
    return this.questRepository.findAll(filter, sort, QuestStatus.PUBLISHED);
  }

  async getAllReadyQuests(filter?: { title?: string; category?: Category; difficulty?: number },
    sort?: { sortBy?: QuestSortField, sortOrder?: QuestSortOrder }
  ): Promise<Quest[]> {
    return this.questRepository.findAll(filter, sort, QuestStatus.READY);
  }

  async getAllMyQuests(userId: string, filter?: { title?: string; category?: Category; difficulty?: number }): Promise<Quest[]> {
    return this.questRepository.findMyQuests(userId, filter);
  }

  async getMyReadyQuests(userId: string, filter?: { title?: string; category?: Category; difficulty?: number }): Promise<Quest[]> {
    return this.questRepository.findMyQuests(userId, filter, QuestStatus.READY);
  }

  async findQuestById(id: string, questStatus?: QuestStatus): Promise<Quest> {
    const quest = await this.questRepository.findById(id, questStatus);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }
    return quest;
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

  async setQuestReady(id: string): Promise<Quest> {
    const quest = await this.findQuestById(id);
    const tasks = await this.questTaskService.findTasksByQuest(id);
    if (!(quest.taskQuantity >= 1 && tasks.every(task => task.isFinalized))) {
      throw new BadRequestException('All tasks must be finalized and at least one task must exist');
    }  
    return await this.questRepository.setStatus(id, QuestStatus.READY);
  }

  async setQuestPublished(id: string): Promise<Quest> {
    const quest = await this.findQuestById(id);
    if (quest.quest_status !== QuestStatus.READY) {
      throw new BadRequestException('Quest must be ready to publish it!');
    }
    return await this.questRepository.setStatus(id, QuestStatus.PUBLISHED)
  }
}
