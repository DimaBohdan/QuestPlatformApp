import { Injectable } from "@nestjs/common";
import { CoordinateService } from "src/services/coordinate.service";
import { ITaskCleanerService } from "utils/interfaces/task-cleaner-service.interface";

@Injectable()
export class ChoiceCleaner implements ITaskCleanerService{
  constructor(private coordinateService: CoordinateService) {}

  async clear(taskId: string): Promise<void> {
    await this.coordinateService.clearCoordinates(taskId);
  }
}
