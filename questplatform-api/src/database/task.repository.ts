import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestTask } from '@prisma/client';
import { UpdateQuestTaskDto } from 'src/dto/update.quest-task.dto';
import { CreateBaseQuestTaskDto } from 'src/dto/create.base-quest-task.dto';

@Injectable()
export class QuestTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<QuestTask | null> {
    const task = await this.prisma.questTask.findUnique({ where: { id } });
    return task;
  }

  async findTaskByIndex(questId: string, order: number): Promise<QuestTask | null> {
    const task = await this.prisma.questTask.findUnique({ where:
      { questId_order:
        { questId, order }
      } 
    });
    return task;
  }

  async findLastTask(questId: string): Promise<QuestTask | null> {
    return this.prisma.questTask.findFirst({
      where: { questId },
      orderBy: { order: 'desc' },
    });
  }

  async findTasksByQuest(questId: string): Promise<QuestTask[]> {
    return this.prisma.questTask.findMany({
      where: { questId },
    })
  }

  async create(questId: string, order: number, data: CreateBaseQuestTaskDto): Promise<QuestTask> {
    return this.prisma.$transaction(async (prisma) => {
      const task = await prisma.questTask.create({
        data: {
          questId,
          order,
          ...data,
        },
      });
      await prisma.quest.update({
        where: { id: questId },
        data: {
          taskQuantity: { increment: 1 },
        },
      });
      return task;
    });
  }

  async save(taskId: string): Promise<QuestTask> {
    return this.prisma.questTask.update({ 
      where: { id: taskId },
      data: { isFinalized: true },
    });
  }

  async update(id: string, data: UpdateQuestTaskDto): Promise<QuestTask> {
    return this.prisma.questTask.update({ 
      where: { id },
      data: data,
    });
  }

  async updateTaskOrder(task: QuestTask, newOrder: number): Promise<void> {
    const oldOrder = task.order;
    await this.prisma.$transaction(async (tx) => {
      if (newOrder > oldOrder) {
        await tx.questTask.updateMany({
          where: {
            questId: task.questId,
            order: { gte: oldOrder + 1, lte: newOrder },
          },
          data: { order: { decrement: 1 } },
        });
      }
      else if (newOrder < oldOrder) {
        await tx.questTask.updateMany({
          where: {
            questId: task.questId,
            order: { gte: newOrder, lte: oldOrder - 1 },
          },
          data: { order: { increment: 1 } },
        });
      }
      await tx.questTask.update({
        where: { id: task.id },
        data: { order: newOrder },
      });
    });  
  }

  async deleteById(id: string, questId: string): Promise<QuestTask> {
    return this.prisma.$transaction(async (tx) => {
      const task = await tx.questTask.delete({ where: { id } });
      await tx.quest.update({
        where: { id: questId },
        data: {
          taskQuantity: { decrement: 1 },
        },
      });
      await tx.questTask.updateMany({
        where: {
          questId,
          order: { gt: task.order },
        },
        data: {
          order: { decrement: 1 },
        },
      });
      return task;
    });
  }

  async clearTextAnswer(taskId: string): Promise<void> {
    await this.prisma.questTask.update({ 
      where: { id: taskId },
      data: {
        textAnswer: undefined,
      },
    });
  }
}
