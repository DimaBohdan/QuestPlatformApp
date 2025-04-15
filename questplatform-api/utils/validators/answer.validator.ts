import { UserAnswerDTO } from "../../src/dto/answer.dto";

export interface AnswerValidator {
  validate(answer: UserAnswerDTO): boolean;
}