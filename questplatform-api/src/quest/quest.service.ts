import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { QuestRepository } from 'src/database/quest.repository';
import { CreateQuestDto } from './dto/quest.create.dto';
import { Category, Quest, User } from '@prisma/client';
import { UpdateQuestDto } from './dto/quest.update.dto';

@Injectable()
export class QuestService {
  constructor(private questRepository: QuestRepository) {}

  async getAllPublicQuests(filter?: { title?: string; category?: Category; difficulty?: number }): Promise<Quest[]> {
    return this.questRepository.findAllPublic(filter);
  }

  async getQuestById(id: string): Promise<Quest> {
    const quest = await this.questRepository.findById(id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }
    return quest;
  }

  async createQuest(data: CreateQuestDto, authorId: string): Promise<Quest> {
    return this.questRepository.create(data, authorId);
  }

  async updateQuest(id: string, data: UpdateQuestDto): Promise<Quest> {
    const quest = await this.getQuestById(id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
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
