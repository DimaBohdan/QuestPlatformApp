import { QuestTask } from "@prisma/client";

export interface IQuestControllerTask {
  createTask(questId: string, data: any, file?: Express.Multer.File): Promise<QuestTask>;
  saveTask(taskId: string): Promise<QuestTask>;
}
  