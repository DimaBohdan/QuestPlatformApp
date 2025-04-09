import { Injectable } from '@nestjs/common';
import { Category, Quest, QuestStatus, QuestTask } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestDto } from 'src/quest/dto/quest.create.dto';
import { UpdateQuestDto } from 'src/quest/dto/quest.update.dto';
import { QuestSortField } from 'src/quest/enums/QuestSortField.enum';
import { QuestSortOrder } from 'src/quest/enums/QuestSortOrder.enum';

@Injectable()
export class QuestRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    filter?: { title?: string; category?: Category; difficulty?: number },
    sort?: { sortBy?: QuestSortField, sortOrder?: QuestSortOrder },
    questStatus?: QuestStatus
  ): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        ...(questStatus ? { quest_status: questStatus } : {}),
        title: filter?.title ? { contains: filter.title, mode: 'insensitive' } : undefined,
        category: filter?.category,
        difficulty: filter?.difficulty,
      },
      include: {
        author: true,
        reviews: true,
        tasks: true,
        previewImage: true,
        theme: true,
      },
      orderBy: sort?.sortBy
      ? { [sort.sortBy]: sort.sortOrder ?? 'asc' }
      : { createdAt: 'desc' },
    });
  }

  async findMyQuests(
    userId: string,
    filter?: { title?: string; category?: Category; difficulty?: number },
    questStatus?: QuestStatus
  ): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        ...(questStatus ? { quest_status: questStatus } : {}),
        authorId: userId,
        title: filter?.title ? { contains: filter.title, mode: 'insensitive' } : undefined,
        category: filter?.category,
        difficulty: filter?.difficulty,
      },
      include: {
        reviews: true,
        tasks: true,
        previewImage: true,
        theme: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async setStatus(id: string, questStatus: QuestStatus): Promise<Quest> {
    return await this.prisma.quest.update({
      where: { id },
      data: { quest_status: questStatus },
    });  
  }

  async findById(id: string, questStatus?: QuestStatus): Promise<Quest | null> {
    return this.prisma.quest.findUnique({
      where: {
        id,
        ...(questStatus ? { quest_status: questStatus } : {}),
      },
      include: {
        author: true,
        reviews: true,
        tasks: true,
        previewImage: true,
        theme: true,
      },
    });
  }

  async create(data: CreateQuestDto, authorId: string): Promise<Quest> {
    return this.prisma.quest.create({
      data: { 
        ...data, 
        authorId
      },
    });
  }

  async update(id: string, data: UpdateQuestDto): Promise<Quest> {
    return this.prisma.quest.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Quest> {
    return this.prisma.quest.delete({
      where: { id },
    });
  }
}
