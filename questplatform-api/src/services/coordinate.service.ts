import { Injectable, NotFoundException } from '@nestjs/common';
import { CoordinateRepository } from 'src/database/coordinate.repository';
import { QuestTaskService } from 'src/services/quest-task.service';
import { CreateCoordinateDto } from '../dto/coordinate.create.dto';
import { Coordinate } from '@prisma/client';
import { UpdateCoordinateDto } from '../dto/coordinate.update.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CoordinateService {
  constructor(
    private readonly coordinateRepository: CoordinateRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async createCoordinate(id: string, dto: CreateCoordinateDto): Promise<Coordinate> {
    const coordinate = await this.coordinateRepository.createCoordinate(id, dto);
    this.eventEmitter.emit('task.structure-updated', { taskId: coordinate.findOnTaskId });
    return coordinate;
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
    const coordinate = await this.coordinateRepository.updateCoordinate(id, dto);
    this.eventEmitter.emit('task.structure-updated', { taskId: coordinate.findOnTaskId });
    return coordinate;
  }

  async clearCoordinates(taskId: string): Promise<void> {
    this.eventEmitter.emit('task.structure-updated', { taskId });
    return this.coordinateRepository.clearCoordinates(taskId);
  }

  async deleteCoordinate(id: string): Promise<Coordinate> {
    const coordinate = await this.coordinateRepository.deleteCoordinate(id);
    this.eventEmitter.emit('task.structure-updated', { taskId: coordinate.findOnTaskId });
    return coordinate;
  }
}
