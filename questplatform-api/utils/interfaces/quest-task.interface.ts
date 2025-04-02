import { AnswerDto } from "./user.answer.dto";

export interface IQuestTask {
  createTask(questId: string, data: any, file?: Express.Multer.File): Promise<any>;
  // validateTask(userAnswer: any, expectedAnswer: any): boolean;
  // submitUserAnswer(taskId: any, body: AnswerDto, req: Request): Promise<void>;
}
  