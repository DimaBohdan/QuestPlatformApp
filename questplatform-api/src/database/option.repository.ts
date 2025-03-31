import { Injectable } from "@nestjs/common";
import { Option } from "@prisma/client";
import { CreateOptionDto } from "src/option/dto/create.option.dto";
import { UpdateOptionDto } from "src/option/dto/update.option.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OptionRepository {
  constructor(private prisma: PrismaService) {}

  async createOption(id: string, dto: CreateOptionDto): Promise<Option> {
    return this.prisma.option.create({
      data: {
        text: dto.text,
        isCorrect: dto.isCorrect,
        taskId: id,
      },
    });
  }

  async getOptionsByTask(id: string): Promise<Option[]> {
    return this.prisma.option.findMany({ where: { taskId: id } });
  }

  async getOptionById(id: string): Promise<Option | null> {
    const option = await this.prisma.option.findUnique({ where: { id } });
    return option;
  }

  async getCorrectAnswers(taskId: string): Promise<Option[]> {
    const correctAnswers = await this.prisma.option.findMany({ where: { taskId, isCorrect: true } });
    return correctAnswers;
  }

  async updateOption(id: string, dto: UpdateOptionDto): Promise<Option> {
    return this.prisma.option.update({
      where: { id },
      data: {
        text: dto.text,
        mediaId: dto.mediaId,
        isCorrect: dto.isCorrect,
      },
    });
  }

  async deleteOption(id: string): Promise<Option> {
    return this.prisma.option.delete({ where: { id } });
  }
}