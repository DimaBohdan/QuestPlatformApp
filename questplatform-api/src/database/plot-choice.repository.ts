import { Injectable } from "@nestjs/common";
import { Option, PlotChoice } from "@prisma/client";
import { CreateOptionDto } from "src/dto/create.option.dto";
import { CreatePlotChoiceDto } from "src/dto/create.plot-choice.dto";
import { UpdateOptionDto } from "src/dto/update.option.dto";
import { UpdatePlotChoiceDto } from "src/dto/update.plot-choice.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PlotChoiceRepository {
  constructor(private prisma: PrismaService) {}

  async create(nodeId: string, dto: CreatePlotChoiceDto): Promise<PlotChoice> {
    return this.prisma.plotChoice.create({
      data: {
        nodeId,
        text: dto.text,
        nextNodeId: dto.nextNodeId,
      },
    });
  }

  async getChoicesByNode(id: string): Promise<PlotChoice[]> {
    return this.prisma.plotChoice.findMany({ where: { nodeId: id } });
  }

  async getChoiceById(id: string): Promise<PlotChoice | null> {
    const choice = await this.prisma.plotChoice.findUnique({ where: { id } });
    return choice;
  }

  async update(id: string, dto: UpdatePlotChoiceDto): Promise<PlotChoice> {
    return this.prisma.plotChoice.update({
      where: { id },
      data: {
        text: dto.text,
        nextNodeId: dto.nextNodeId,
      },
    });
  }

  async clearChoices(taskId: string): Promise<void> {
    await this.prisma.plotChoice.deleteMany({ where: { node: { taskId } } });
  }

  async delete(id: string): Promise<PlotChoice> {
    return this.prisma.plotChoice.delete({ where: { id } });
  }
}