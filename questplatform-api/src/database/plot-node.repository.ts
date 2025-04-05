import { Injectable } from "@nestjs/common";
import { Option, PlotNode } from "@prisma/client";
import { CreateOptionDto } from "src/option/dto/create.option.dto";
import { UpdateOptionDto } from "src/option/dto/update.option.dto";
import { CreatePlotNodeDto } from "src/plot-node/dto/create.plot-node.dto";
import { UpdatePlotNodeDto } from "src/plot-node/dto/update.plot-node.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PlotNodeRepository {
  constructor(private prisma: PrismaService) {}

  async create(taskId: string, dto: CreatePlotNodeDto): Promise<PlotNode> {
    return this.prisma.plotNode.create({
      data: {
        ...dto,
        taskId,
      },
    });
  }

  async getByTask(id: string): Promise<PlotNode[]> {
    return this.prisma.plotNode.findMany({ where: { taskId: id } });
  }

  async getById(id: string): Promise<PlotNode | null> {
    const option = await this.prisma.plotNode.findUnique({ where: { id } });
    return option;
  }

  async update(id: string, data: UpdatePlotNodeDto): Promise<PlotNode> {
    return this.prisma.plotNode.update({
      where: { id },
      data,
    });
  }

  async clearNodes(taskId: string): Promise<void> {
    await this.prisma.plotNode.deleteMany({ where: { taskId } });
  }

  async delete(id: string): Promise<PlotNode> {
    return this.prisma.plotNode.delete({ where: { id } });
  }
}