import { Injectable } from "@nestjs/common";
import { OptionService } from "src/services/option.service";
import { PlotChoiceService } from "src/services/plot-choice.service";
import { PlotNodeService } from "src/services/plot-node.service";
import { ITaskCleanerService } from "utils/interfaces/task-cleaner-service.interface";

@Injectable()
export class PlotCleaner implements ITaskCleanerService{
  constructor(
    private readonly plotNodeService: PlotNodeService,
) {}

  async clear(taskId: string): Promise<void> {
    await this.plotNodeService.clearNodes(taskId);
  }
}