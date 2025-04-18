import { Injectable } from "@nestjs/common";
import { QuestReview } from "@prisma/client";
import { CreateQuestReviewDto } from "src/dto/create.quest-review.dto";
import { UpdateQuestReviewDto } from "src/dto/update.quest-review.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QuestReviewRepository {
  constructor(private prisma: PrismaService) {}

  async create(questId: string, userId: string, dto: CreateQuestReviewDto): Promise<QuestReview> {
    return this.prisma.questReview.create({
      data: {
        ...dto,
        authorId: userId,
        questId
      },
    });
  }

  async getReviewsByQuest(questId: string): Promise<QuestReview[]> {
    return this.prisma.questReview.findMany({ where: { questId } });
  }

  async getReviewById(id: string): Promise<QuestReview | null> {
    const questReview = await this.prisma.questReview.findUnique({ where: { id } });
    return questReview;
  }

  async update(id: string, dto: UpdateQuestReviewDto): Promise<QuestReview> {
    return this.prisma.questReview.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<QuestReview> {
    return this.prisma.questReview.delete({ where: { id } });
  }
}