import { UserAnswerDTO } from "../../src/dto/answer.dto";
import { AnswerValidator } from "./answer.validator";

export class SingleChoiceValidator implements AnswerValidator {
  validate(answer: UserAnswerDTO): boolean {
    return Array.isArray(answer.selectedOptions) && answer.selectedOptions.length === 1;
  }
}