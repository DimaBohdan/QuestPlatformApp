import { Injectable } from '@nestjs/common';
import { Category, Quest } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestDto } from 'src/quest/dto/quest.create.dto';
import { UpdateQuestDto } from 'src/quest/dto/quest.update.dto';

@Injectable()
export class QuestRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPublic(filter?: { title?: string; category?: Category; difficulty?: number }): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        isPublic: true,
        title: filter?.title ? { contains: filter.title, mode: 'insensitive' } : undefined,
        category: filter?.category,
        difficulty: filter?.difficulty,
      },
      include: { author: true, reviews: true, tasks: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Quest | null> {
    return this.prisma.quest.findUnique({
      where: { id, },
      include: { author: true, reviews: true, tasks: true },
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
