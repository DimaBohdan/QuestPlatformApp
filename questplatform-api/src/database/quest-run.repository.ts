import { Injectable } from "@nestjs/common";
import { QuestRun, QuestRunStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QuestRunRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSingleRun(questId: string, userId: string): Promise<QuestRun> {
    return this.prisma.questRun.create({
      data: {
        questId,
        mode: 'SINGLE_PLAYER',
        createdById: userId,
        status: QuestRunStatus.INACTIVE,
        startedAt: new Date(),
      },
    });
  }

  async createMultipleRun(questId: string, userId: string, code: string): Promise<QuestRun> {
    return this.prisma.questRun.create({
      data: {
        questId,
        mode: 'MULTIPLAYER',
        createdById: userId,
        sessionCode: code,
        status: QuestRunStatus.INACTIVE,
      },
    });
  }

  async startRun(runId: string): Promise<QuestRun> {
    return this.prisma.questRun.update({
      where: { id: runId },
      data: {
        status: QuestRunStatus.STARTED,
        startedAt: new Date(),
      },
    });
  }

  async processNextTask(runId: string): Promise<QuestRun> {
    return this.prisma.questRun.update({
      where: { id: runId },
      data: {
        currentTaskIndex: { increment: 1 },
      }
    })
  }

  async findBySessionCode(code: string): Promise<QuestRun | null> {
    return this.prisma.questRun.findUnique({ where: { sessionCode: code } });
  }

  async getQuestRunById(runId: string): Promise<QuestRun | null> {
    return this.prisma.questRun.findUnique({ where: { id: runId } });
  }
  
  async completeRun(runId: string): Promise<QuestRun> {
    return this.prisma.questRun.update({
      where: { id: runId },
      data: {
        status: QuestRunStatus.COMPLETED,
        completedAt: new Date(),
      },
    });
  }
}