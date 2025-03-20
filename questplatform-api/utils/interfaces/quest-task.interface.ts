import { AnswerDto } from "./user.answer.dto";

export interface IQuestTask {
  createTask(data: any): Promise<any>;
  validateTask(userAnswer: any, expectedAnswer: any): boolean;
  submitUserAnswer(taskId: any, body: AnswerDto, req: Request): Promise<void>;
}
  