import { QuestTask } from "@prisma/client";

export interface IQuestServiceTask {
  saveTask(taskId: string): Promise<QuestTask>;
}