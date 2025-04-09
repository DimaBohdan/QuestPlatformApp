import { QuestTaskType } from "@prisma/client";
import { AnswerValidator } from "./answer.validator";
import { MultipleChoiceValidator } from "./multiple-choice.validator";
import { PlotTaskValidator } from "./plot-task.validator";
import { SingleChoiceValidator } from "./single-choice.validator";
import { TextAnswerValidator } from "./text-answer.validator";

export class AnswerValidatorFactory {
    static getValidator(taskType: string): AnswerValidator {
      if (taskType === QuestTaskType.TEXT_FIELD) return new TextAnswerValidator();
      if (taskType === QuestTaskType.SINGLE_CHOICE) return new SingleChoiceValidator();
      if (taskType === QuestTaskType.MULTIPLE_CHOICE) return new MultipleChoiceValidator();
      if (taskType === QuestTaskType.INTERACTIVE_PLOT) return new PlotTaskValidator();
      
      throw new Error(`Unknown task type: ${taskType}`);
    }
  }
  