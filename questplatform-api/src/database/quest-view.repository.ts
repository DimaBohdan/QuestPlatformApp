import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestViewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertByUser(userId: string, questId: string) {
    return this.prisma.questView.upsert({
      where: { userId_questId: { userId, questId } },
      update: {},
      create: { userId, questId },
    });
  }

  async upsertBySession(guestSessionId: string, questId: string) {
    return this.prisma.questView.upsert({
      where: { guestSessionId_questId: { guestSessionId, questId } },
      update: {},
      create: { guestSessionId, questId },
    });
  }

  async incrementQuestViews(questId: string) {
    return this.prisma.quest.update({
      where: { id: questId },
      data: { viewsCount: { increment: 1 } },
    });
  }
}
