import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { QuestRunService } from "src/services/quest-run.service";

@Injectable()
export class TaskTimerService {
  private taskTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    @Inject(forwardRef(() => QuestRunService))
    private readonly questRunService: QuestRunService,
  ) {}

  setTimer(runId: string, taskIndex: number, durationMs: number): void {
    const key = this.buildKey(runId, taskIndex);
    const timeout = setTimeout(async () => {
      await this.handleTimeout(runId, taskIndex);
    }, durationMs);

    this.taskTimers.set(key, timeout);
  }

  private async handleTimeout(runId: string, taskIndex: number): Promise<void> {
    const run = await this.questRunService.getQuestRunById(runId);
    if (run.currentTaskIndex !== taskIndex) return;
    await this.questRunService.processNextTask(runId);
  }

  clearTimer(runId: string, taskIndex: number): void {
    const key = this.buildKey(runId, taskIndex);
    const timer = this.taskTimers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.taskTimers.delete(key);
    }
  }

  clearAll(): void {
    for (const [, timer] of this.taskTimers.entries()) {
      clearTimeout(timer);
    }
    this.taskTimers.clear();
  }

  private buildKey(runId: string, taskIndex: number): string {
    return `${runId}:${taskIndex}`;
  }
}
