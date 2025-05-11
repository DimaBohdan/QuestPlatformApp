import { Injectable } from "@nestjs/common";
import { QuestRun, QuestRunMode, QuestRunStatus } from "@prisma/client";
import { CreateQuestRunDto } from "src/dto/create.quest-run.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QuestRunRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSingleRun(questId: string, userId: string): Promise<QuestRun> {
    return this.prisma.questRun.create({
      data: {
        questId,
        mode: QuestRunMode.SINGLE_PLAYER,
        createdById: userId,
        status: QuestRunStatus.INACTIVE,
        startedAt: new Date(),
      },
    });
  }

  async createMultipleRun(questId: string, userId: string, code: string, data?: CreateQuestRunDto): Promise<QuestRun> {
    return this.prisma.questRun.create({
      data: {
        questId,
        mode: QuestRunMode.MULTIPLAYER,
        createdById: userId,
        sessionCode: code,
        status: QuestRunStatus.INACTIVE,
        ...data,
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
  
  async findScheduledRunsToLaunch(date: Date): Promise<QuestRun[]> {
    return this.prisma.questRun.findMany({
      where: {
        scheduledAt: {
          lte: date,
        },
        status: 'INACTIVE',
      },
    });
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