import { Injectable } from "@nestjs/common";
import { UserAnswer, UserQuestProgress } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserAnswerDTO } from "src/dto/answer.dto";
import { UserAnswerWithOptions } from "utils/types/userAnswerWithOptions";

@Injectable()
export class UserAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async getUserAnswer(progressId: string, taskId: string): Promise<UserAnswerWithOptions | null> {
    return await this.prisma.userAnswer.findFirst({
      where: {
        progressId,
        taskId,
      },
      include: {
        selectedOptions: {
          include: {
            option: true,
          },
        },
      },
    });
  }

  async getAnswersByRun(runId: string): Promise<UserAnswer[]> {
    return await this.prisma.userAnswer.findMany({
      where: {
        progress : { runId }
      },
      include: {
        selectedOptions: {
          include: {
            option: true,
          },
        },
      },
    });
  }

  async create(progressId: string, taskId: string, answer: UserAnswerDTO): Promise<UserAnswer> {
    return await this.prisma.userAnswer.create({
      data: {
        progressId,
        taskId,
        textAnswer: answer.textAnswer || null,
        selectedCoordsId: answer.selectedCoordsId || null,
        plotChoiceId: answer.plotChoiceId || null,
        selectedOptions: answer.selectedOptions?.length
          ? {
              create: answer.selectedOptions.map(optionId => ({
                optionId,
              }))
            }
          : undefined,
      },
      include: {
        selectedOptions: true,
      },
    });
  }

  async getAnswersByTask(taskId: string): Promise<UserAnswer[]> {
    const answers = await this.prisma.userAnswer.findMany({ where: { taskId } });
    return answers;
  }

  async getAnsweredUserIds(runId: string, taskId: string): Promise<string[]> {
    const answers = await this.prisma.userAnswer.findMany({
      where: {
        taskId,
        progress: {
          runId,
        },
      },
      select: {
        progress: {
          select: {
            userId: true,
          },
        },
      },
    });
    return answers.map(answer => answer.progress.userId);
  }
}