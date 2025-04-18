import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { QuestTaskService } from "src/services/quest-task.service";
import { ITaskCleanerService } from "utils/interfaces/task-cleaner-service.interface";

@Injectable()
export class TextCleaner implements ITaskCleanerService {
  constructor(
    @Inject(forwardRef(() => QuestTaskService))
    private taskService: QuestTaskService,
  ) {}
  async clear(taskId: string): Promise<void> {
    await this.taskService.clearTextAnswer(taskId);
  }
}