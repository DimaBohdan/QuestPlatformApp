import { Injectable } from '@nestjs/common';
import { Quest, QuestStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestDto } from 'src/dto/quest.create.dto';
import { UpdateQuestDto } from 'src/dto/quest.update.dto';
import { QuestFilter } from 'utils/types/quest-filter';
import { QuestSort } from 'utils/types/quest-sort';
import { Pagination } from 'utils/types/pagination';

@Injectable()
export class QuestRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    filter?: QuestFilter,
    sort?: QuestSort,
    pagination?: Pagination,
    questStatus?: QuestStatus
  ): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        ...(questStatus ? { quest_status: questStatus } : {}),
        title: filter?.title ? { contains: filter.title, mode: 'insensitive' } : undefined,
        category: filter?.category,
        difficulty: {
          gte: filter?.minDifficulty,
          lte: filter?.maxDifficulty,
        },
        rating: {
          gte: filter?.minRating,
          lte: filter?.maxRating,
        },
        ...(filter?.tags?.length && { tags: { hasSome: filter.tags } }),
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
      skip: pagination?.page && pagination?.pageSize ? (pagination.page - 1) * pagination.pageSize : undefined,
      take: pagination?.pageSize,
    });
  }

  async findMyQuests(
    userId: string,
    filter?: QuestFilter,
    sort?: QuestSort,
    pagination?: Pagination,
    questStatus?: QuestStatus
  ): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        ...(questStatus ? { quest_status: questStatus } : {}),
        authorId: userId,
        title: filter?.title ? { contains: filter.title, mode: 'insensitive' } : undefined,
        category: filter?.category,
        difficulty: {
          gte: filter?.minDifficulty,
          lte: filter?.maxDifficulty,
        },
        rating: {
          gte: filter?.minRating,
          lte: filter?.maxRating,
        },
        ...(filter?.tags?.length && { tags: { hasSome: filter.tags } }),
      },
      include: {
        reviews: true,
        tasks: true,
        previewImage: true,
        theme: true,
      },
      orderBy: sort?.sortBy
      ? { [sort.sortBy]: sort.sortOrder ?? 'asc' }
      : { createdAt: 'desc' },
      skip: pagination?.page && pagination?.pageSize ? (pagination.page - 1) * pagination.pageSize : undefined,
      take: pagination?.pageSize,
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

  async setRating(id: string, rating: number): Promise<Quest> {
    return this.prisma.quest.update({
      where: { id },
      data: {
        rating
      }
    })
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
