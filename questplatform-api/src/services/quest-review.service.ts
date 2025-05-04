import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestReview } from '@prisma/client';
import { QuestReviewRepository } from 'src/database/quest-review.repository';
import { CreateQuestReviewDto } from 'src/dto/create.quest-review.dto';
import { QuestService } from './quest.service';
import { UpdateQuestReviewDto } from 'src/dto/update.quest-review.dto';
import { Log } from 'utils/decorators/log.decorator';
import { LogLevel } from 'src/enums/LogLevel.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class QuestReviewService {
  constructor(
    private readonly questReviewRepository: QuestReviewRepository,
    private readonly questService: QuestService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Log(LogLevel.INFO)
  async create(questId: string, userId: string, dto: CreateQuestReviewDto): Promise<QuestReview> {
    await this.questService.findQuestById(questId);
    const review = await this.questReviewRepository.create(questId, userId, dto);
    this.eventEmitter.emit('review.rating-updated');
    return review;
  }

  async getReviewById(id: string): Promise<QuestReview> {
    const review =  await this.questReviewRepository.getReviewById(id);
    if (!review) {
        throw new NotFoundException('Review not found');
    }
    return review;
  }

  async getReviewsByQuest(questId: string): Promise<QuestReview[]> {
    await this.questService.findQuestById(questId);
    return await this.questReviewRepository.getReviewsByQuest(questId);
  }

  async update(id: string, dto: UpdateQuestReviewDto): Promise<QuestReview> {
    const review = await this.questReviewRepository.update(id, dto);
    this.eventEmitter.emit('review.rating-updated');
    return review;
  }

  async delete(id: string): Promise<QuestReview> {
    const review = await this.questReviewRepository.delete(id);
    this.eventEmitter.emit('review.rating-updated');
    return review;
  }
}
