import { Injectable } from "@nestjs/common";
import { SingleChoiceTask } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSingleChoiceTaskDto } from "src/single-choice-task/dto/single-choice-task.create.dto";

@Injectable()
export class SingleChoiceTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(dto: CreateSingleChoiceTaskDto): Promise<SingleChoiceTask> {
    return this.prisma.$transaction(async (tx) => {
      const questTask = await tx.questTask.create({
        data: {
          questId: dto.questId,
          question: dto.question,
          order,
          type: "SINGLE_CHOICE",
        },
      });
      const singleChoiceTask = await tx.singleChoiceTask.create({
        data: {
          id: questTask.id,
        },
      })
      return singleChoiceTask;
    });   
  }

  async updateTask(id: string, dto: UpdateSingleChoiceTaskDto) {
    return this.prisma.singleChoiceTask.update({
      where: { id },
      data: { correctOption: { connect: { id: dto.correctOptionId } } },
    });
  }
}
