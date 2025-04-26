import { Injectable } from "@nestjs/common";
import { CoordinateService } from "src/services/coordinate.service";
import { OptionService } from "src/services/option.service";
import { ITaskCleanerService } from "utils/interfaces/task-cleaner-service.interface";

@Injectable()
export class OptionCleaner implements ITaskCleanerService{
  constructor(private optionService: OptionService) {}

  async clear(taskId: string): Promise<void> {
    await this.optionService.clearOptions(taskId);
  }
}
