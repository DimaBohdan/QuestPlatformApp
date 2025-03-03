import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { QuestRepository } from 'src/database/quest.repository';
import { CreateQuestDto } from './dto/quest.create.dto';
import { Category, Quest, User } from '@prisma/client';
import { UpdateQuestDto } from './dto/quest.update.dto';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class QuestService {
  constructor(private questRepository: QuestRepository, private mediaService: MediaService) {}

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
