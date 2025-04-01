import { Injectable } from "@nestjs/common";
import { UserQuestProgress } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserQuestProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLastProgress(userId: string, questId: string): Promise<UserQuestProgress | null> {
    return await this.prisma.userQuestProgress.findFirst({
      where: { userId, questId, completed: false },
      include: { currentTask: true },
    });
  }
  
  async create(userId: string, questId: string, currentTaskId: string): Promise<UserQuestProgress> {
    return await this.prisma.userQuestProgress.create({
      data: {
        userId,
        questId,
        currentTaskId,
        startTime: new Date(),
      },
      include: { currentTask: true },
    });
  }

  async progressNewTask(userId: string, questId: string, currentTaskId: string): Promise<UserQuestProgress[]> {
    await this.prisma.userQuestProgress.updateMany({
      where: { userId, questId },
      data: { currentTaskId: currentTaskId },
    });

    return await this.prisma.userQuestProgress.findMany({
      where: { userId, questId },
    });
  }

  async completeProgress(userId: string, questId: string): Promise<UserQuestProgress[]> {
    const result = await this.prisma.$transaction([
      this.prisma.userQuestProgress.updateMany({
        where: { userId, questId },
        data: { completed: true },
      }),
  
      this.prisma.quest.update({
        where: { id: questId },
        data: { playCount: { increment: 1 } },
      }),
    ]);
  
    return this.prisma.userQuestProgress.findMany({
      where: { userId, questId },
    });
  }
  
}