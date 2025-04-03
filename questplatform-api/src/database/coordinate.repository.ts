import { Injectable } from "@nestjs/common";
import { Coordinate } from "@prisma/client";
import { CreateCoordinateDto } from "src/coordinate/dto/coordinate.create.dto";
import { UpdateCoordinateDto } from "src/coordinate/dto/coordinate.update.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CoordinateRepository {
  constructor(private prisma: PrismaService) {}

  async createCoordinate(id: string, data: CreateCoordinateDto): Promise<Coordinate> {
    return await this.prisma.coordinate.create({
      data: {
        ...data,
        findOnTaskId: id,
      }
    });
  }

  async getCoordinateByTask(taskId: string): Promise<Coordinate | null> {
    return await this.prisma.coordinate.findUnique({ where: { findOnTaskId: taskId }});
  }

  async getCoordinateById(id: string): Promise<Coordinate | null> {
    const coordinate = await this.prisma.coordinate.findUnique({ where: { id } });
    return coordinate;
  }

  async updateCoordinate(id: string, data: UpdateCoordinateDto): Promise<Coordinate> {
    return await this.prisma.coordinate.update({
      where: { id },
      data
    });
  }

  async clearCoordinates(taskId: string): Promise<void> {
    await this.prisma.coordinate.deleteMany({ where: { findOnTaskId: taskId } });
  }

  async deleteCoordinate(id: string): Promise<Coordinate> {
    return await this.prisma.coordinate.delete({ where: { id } });
  }
}