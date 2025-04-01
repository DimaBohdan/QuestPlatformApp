import { Injectable } from '@nestjs/common';
import { Category, Quest, QuestTask } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestDto } from 'src/quest/dto/quest.create.dto';
import { UpdateQuestDto } from 'src/quest/dto/quest.update.dto';
import { QuestSortField } from 'src/quest/enums/QuestSortField.enum';
import { QuestSortOrder } from 'src/quest/enums/QuestSortOrder.enum';

@Injectable()
export class QuestRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPublic(filter?: { title?: string; category?: Category; difficulty?: number }, sort?: { sortBy?: QuestSortField, sortOrder?: QuestSortOrder }): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {

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

  async findAllReady(filter?: { title?: string; category?: Category; difficulty?: number }, sort?: { sortBy?: QuestSortField, sortOrder?: QuestSortOrder }): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        isPublic: true,
        title: filter?.title ? { contains: filter.title, mode: 'insensitive' } : undefined,
        category: filter?.category,
        difficulty: filter?.difficulty,
        taskQuantity: { gte: 1 },
        tasks: {
          every: {
            isFinalized: true,
          },
        },  
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

  async findMyQuests(userId: string, filter?: { title?: string; category?: Category; difficulty?: number }): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        isPublic: true,
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

  async findById(id: string): Promise<Quest | null> {
    return this.prisma.quest.findUnique({
      where: { id },
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
