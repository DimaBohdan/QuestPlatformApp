import { UserAnswerDTO } from "../../src/dto/answer.dto";
import { AnswerValidator } from "./answer.validator";

export class PlotTaskValidator implements AnswerValidator {
  validate(answer: UserAnswerDTO): boolean {
    return typeof answer.plotChoiceId === 'string';
  }
}