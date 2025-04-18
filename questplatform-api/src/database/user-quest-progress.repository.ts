import { Injectable } from "@nestjs/common";
import { QuestRunMode, UserQuestProgress } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserQuestProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProgress(userId: string, runId: string): Promise<UserQuestProgress> {
    return await this.prisma.userQuestProgress.create({
      data: {
        userId,
        runId,
      }
    });
  }
  async findProgressById(progressId: string): Promise<UserQuestProgress | null> {
    return await this.prisma.userQuestProgress.findFirst({
      where: { id: progressId },
    });
  }

  async findProgress(userId: string, runId: string): Promise<UserQuestProgress | null> {
    return await this.prisma.userQuestProgress.findFirst({
      where: { userId, runId },
    });
  }

  async findProgressByRun(runId: string): Promise<UserQuestProgress[]> {
    return await this.prisma.userQuestProgress.findMany({
      where: { runId },
    });
  }

  async updateScore(progressId: string, score: number): Promise<UserQuestProgress> {
    return await this.prisma.userQuestProgress.update({
      where: { id: progressId },
      data: { score },
    })
  }
}