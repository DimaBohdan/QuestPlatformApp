import { Injectable, NotFoundException } from '@nestjs/common';
import { CoordinateRepository } from 'src/database/coordinate.repository';
import { QuestTaskService } from 'src/services/quest-task.service';
import { CreateCoordinateDto } from '../dto/coordinate.create.dto';
import { Coordinate } from '@prisma/client';
import { UpdateCoordinateDto } from '../dto/coordinate.update.dto';

@Injectable()
export class CoordinateService {
  constructor(
    private readonly coordinateRepository: CoordinateRepository,
  ) {}

  async createCoordinate(id: string, dto: CreateCoordinateDto): Promise<Coordinate> {
    return this.coordinateRepository.createCoordinate(id, dto);
  }

  async getCoordinateByTask(taskId: string): Promise<Coordinate> {
    const coordinate = await this.coordinateRepository.getCoordinateByTask(taskId);
    if (!coordinate) {
      throw new NotFoundException('Coordinate not found');
    }
    return coordinate;
  }
  async getCoordinateById(id: string): Promise<Coordinate> {
    const coordinate = await this.coordinateRepository.getCoordinateById(id);
    if (!coordinate) {
      throw new NotFoundException('Coordinate not found');
    }
    return coordinate;
  }

  async updateCoordinare(id: string, dto: UpdateCoordinateDto): Promise<Coordinate> {
    return this.coordinateRepository.updateCoordinate(id, dto);
  }

  async clearCoordinates(taskId: string): Promise<void> {
    return this.coordinateRepository.clearCoordinates(taskId);
  }

  async deleteCoordinate(id: string): Promise<Coordinate> {
    return this.coordinateRepository.deleteCoordinate(id);
  }
}
