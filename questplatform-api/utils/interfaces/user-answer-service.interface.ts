import { QuestTask, UserAnswer } from "@prisma/client";
import { UserAnswerDTO } from "src/dto/answer.dto";

export interface IUserAnswerService {
  validateAnswer(answer: UserAnswerDTO, task: QuestTask): Promise<boolean> | boolean;
  checkAnswer(progressId: string, taskId: string): Promise<boolean>;
}