import { AnswerValidator } from "./answer.validator";
import { MultipleChoiceValidator } from "./multiple-choice.validator";
import { PlotTaskValidator } from "./plot-task.validator";
import { SingleChoiceValidator } from "./single-choice.validator";
import { TextAnswerValidator } from "./text-answer.validator";

export class AnswerValidatorFactory {
    static getValidator(taskType: string): AnswerValidator {
      if (taskType === 'TEXT_FIELD') return new TextAnswerValidator();
      if (taskType === 'SINGLE_CHOICE') return new SingleChoiceValidator();
      if (taskType === 'MULTIPLE_CHOICE') return new MultipleChoiceValidator();
      if (taskType === 'PLOT_TASK') return new PlotTaskValidator();
      
      throw new Error(`Unknown task type: ${taskType}`);
    }
  }
  