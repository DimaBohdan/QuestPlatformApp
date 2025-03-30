import { UserAnswerDTO } from "../../src/user-answer/dto/answer.dto";

export interface AnswerValidator {
  validate(answer: UserAnswerDTO): boolean;
}