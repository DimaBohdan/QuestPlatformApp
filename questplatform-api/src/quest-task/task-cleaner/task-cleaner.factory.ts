import { Injectable } from "@nestjs/common";
import { QuestTaskType } from "@prisma/client";
import { ChoiceCleaner } from "utils/task-cleaner/choice-cleaner";
import { DefaultCleaner } from "utils/task-cleaner/default-cleaner";

@Injectable()
export class TaskCleanerFactory {
  constructor(
    private ChoiceCleaner: ChoiceCleaner,
    // private plotCleaner: PlotCleaner,
    // private coordinateSelectionCleaner: CoordinateSelectionCleaner,
    private defaultCleaner: DefaultCleaner
  ) {}

  getCleaner(taskType: QuestTaskType): TaskCleaner {
    if (['SINGLE_CHOICE', 'MULTIPLE_CHOICE'].includes(taskType)) {
      return this.ChoiceCleaner;
    }
    // if (taskType === 'INTERACTIVE_PLOT') {
    //   return this.plotCleaner;
    // }
    // if (['FIND_ON_PICTURE', 'FIND_ON_MAP'].includes(taskType)) {
    //   return this.coordinateSelectionCleaner;
    // }
    return this.defaultCleaner;
  }
}
