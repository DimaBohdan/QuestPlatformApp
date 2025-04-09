import { Injectable } from "@nestjs/common";
import { UserAnswer, UserQuestProgress } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserAnswerDTO } from "src/user-answer/dto/answer.dto";

@Injectable()
export class UserAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}
  
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