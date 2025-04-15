import { UserAnswerDTO } from "../../src/dto/answer.dto";
import { AnswerValidator } from "./answer.validator";

export class MultipleChoiceValidator implements AnswerValidator {
  validate(answer: UserAnswerDTO): boolean {
    return Array.isArray(answer.selectedOptions) && answer.selectedOptions.length > 0;
  }
}