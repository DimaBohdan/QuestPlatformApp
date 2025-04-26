import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { QuestTaskType } from "@prisma/client";
import { ITaskCleanerService } from "utils/interfaces/task-cleaner-service.interface";
import { OptionCleaner } from "utils/task-cleaner/option-cleaner";
import { CoordinateCleaner } from "utils/task-cleaner/coordinate-cleaner";
import { TextCleaner } from "utils/task-cleaner/text-cleaner";
import { PlotCleaner } from "utils/task-cleaner/plot-cleaner";

@Injectable()
export class TaskCleanerRegistry {
  private strategies = new Map<QuestTaskType, ITaskCleanerService>();

  constructor(
    @Inject(forwardRef(() => OptionCleaner)) choiceCleaner: ITaskCleanerService,
    @Inject(forwardRef(() => PlotCleaner)) plotCleaner: ITaskCleanerService,
    @Inject(forwardRef(() => CoordinateCleaner)) coordinateCleaner: ITaskCleanerService,
    @Inject(forwardRef(() => TextCleaner)) textCleaner: ITaskCleanerService,
  ) {
    this.strategies.set(QuestTaskType.SINGLE_CHOICE, choiceCleaner);
    this.strategies.set(QuestTaskType.MULTIPLE_CHOICE, choiceCleaner);
    this.strategies.set(QuestTaskType.TEXT_FIELD, textCleaner);
    this.strategies.set(QuestTaskType.FIND_ON_MAP, coordinateCleaner);
    this.strategies.set(QuestTaskType.FIND_ON_PICTURE, coordinateCleaner);
    this.strategies.set(QuestTaskType.INTERACTIVE_PLOT, plotCleaner);
  }

  getStrategy(type: QuestTaskType): ITaskCleanerService {
    const strategy = this.strategies.get(type);
    if (!strategy) throw new NotFoundException(`Strategy not found for type: ${type}`);
    return strategy;
  }
}
