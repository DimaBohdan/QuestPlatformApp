import { Injectable } from "@nestjs/common";
import { Option } from "@prisma/client";
import { CreateOptionDto } from "src/option/dto/create.option.dto";
import { UpdateOptionDto } from "src/option/dto/update.option.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OptionRepository {
  constructor(private prisma: PrismaService) {}

  async createSingleOption(id: string, dto: CreateOptionDto): Promise<Option> {
    return this.prisma.option.create({
      data: {
        text: dto.text,
        mediaId: dto.mediaId,
        isCorrect: dto.isCorrect,
        singleChoiceTaskId: id,
      },
    });
  }

  async createMultipleOption(id: string, dto: CreateOptionDto): Promise<Option> {
    return this.prisma.option.create({
      data: {
        text: dto.text,
        mediaId: dto.mediaId,
        isCorrect: dto.isCorrect,
        multipleChoiceTaskId: id,
      },
    });
  }

  async getOptionsBySingleTask(id: string): Promise<Option[]> {
    return this.prisma.option.findMany({ where: { singleChoiceTaskId: id } });
  }

  async getOptionsByMultipleTask(id: string): Promise<Option[]> {
    return this.prisma.option.findMany({ where: { multipleChoiceTaskId: id } });
  }

  async getOptionById(id: string): Promise<Option | null> {
    const option = await this.prisma.option.findUnique({ where: { id } });
    return option;
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