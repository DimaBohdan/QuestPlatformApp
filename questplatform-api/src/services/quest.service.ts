import { Injectable, NotFoundException, ForbiddenException, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { QuestRepository } from 'src/database/quest.repository';
import { CreateQuestDto } from '../dto/quest.create.dto';
import { Quest, QuestStatus } from '@prisma/client';
import { UpdateQuestDto } from '../dto/quest.update.dto';
import { MediaService } from 'src/services/media.service';
import { QuestTaskService } from 'src/services/quest-task.service';
import { OnEvent } from '@nestjs/event-emitter';
import { QuestReviewService } from './quest-review.service';
import { QuestSort } from 'utils/types/quest-sort';
import { QuestFilter } from 'utils/types/quest-filter';
import { Pagination } from 'utils/types/pagination';


@Injectable()
export class QuestService {
  constructor(
    private questRepository: QuestRepository, 
    private mediaService: MediaService,
    @Inject(forwardRef(() => QuestTaskService))
    private questTaskService: QuestTaskService,
    @Inject(forwardRef(() => QuestReviewService))
    private questReviewService: QuestReviewService,
  ) {}

  async getAllPublishedQuests(
    filter?: QuestFilter,
    sort?: QuestSort,
    pagination?: Pagination,
  ): Promise<Quest[]> {
    return this.questRepository.findAll(filter, sort, pagination, QuestStatus.PUBLISHED);
  }

  async getAllReadyQuests(
    filter?: QuestFilter,
    sort?: QuestSort,
    pagination?: Pagination,
  ): Promise<Quest[]> {
    return this.questRepository.findAll(filter, sort, pagination, QuestStatus.READY);
  }

  async getAllMyQuests(
    userId: string,
    filter?: QuestFilter,
    sort?: QuestSort,
    pagination?: Pagination,
  ): Promise<Quest[]> {
    return this.questRepository.findMyQuests(userId, filter, sort, pagination);
  }

  async getMyReadyQuests(
    userId: string,
    filter?: QuestFilter,
    sort?: QuestSort,
    pagination?: Pagination,
  ): Promise<Quest[]> {
    return this.questRepository.findMyQuests(userId, filter, sort, pagination, QuestStatus.READY);
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
      const image = await this.mediaService.uploadMedia(file, {'questId': quest.id})
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
      await this.mediaService.uploadMedia(file, {'questId': quest.id});
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

  @OnEvent('tasks.change')
  async validateAndSetDraftStatus({ questId }: { questId: string }): Promise<Quest | undefined> {
    const quest = await this.findQuestById(questId);
    const tasks = await this.questTaskService.findTasksByQuest(questId);
    if (quest.taskQuantity < 1 && tasks.some(task => !task.isFinalized)) {
      return await this.questRepository.setStatus(questId, QuestStatus.DRAFT);
    }
  }

  async setQuestDraft(id: string): Promise<Quest> {
    await this.findQuestById(id);
    return await this.questRepository.setStatus(id, QuestStatus.DRAFT);
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
    await this.setQuestReady(id);
    const quest = await this.findQuestById(id);
    if (quest.quest_status !== QuestStatus.READY) {
      throw new BadRequestException('Quest must be ready to publish it!');
    }
    return await this.questRepository.setStatus(id, QuestStatus.PUBLISHED)
  }

  @OnEvent('review.rating-updated')
  async calculateQuestRating(questId: string): Promise<Quest> {
    const reviews = await this.questReviewService.getReviewsByQuest(questId);   
    const total = reviews.reduce((sum, r) => sum + r.score, 0);
    const average = total / reviews.length;
    return await this.questRepository.setRating(questId, average);
  }
}
