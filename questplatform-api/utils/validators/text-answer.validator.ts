import { UserAnswerDTO } from "../../src/dto/answer.dto";
import { AnswerValidator } from "./answer.validator";

export class TextAnswerValidator implements AnswerValidator {
  validate(answer: UserAnswerDTO): boolean {
    return typeof answer.textAnswer === 'string' && answer.textAnswer.trim().length > 0;
  }
}