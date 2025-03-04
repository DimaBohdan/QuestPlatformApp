import { Injectable } from "@nestjs/common";
import { UserAnswer, UserQuestProgress } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(userId: string, taskId: string, answer: string): Promise<UserAnswer> {
    return await this.prisma.userAnswer.create({
      data: {
        userId,
        taskId,
        answer,
      },
    });
  }
}