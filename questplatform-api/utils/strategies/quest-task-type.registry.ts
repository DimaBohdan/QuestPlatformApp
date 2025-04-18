import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { QuestTaskType } from "@prisma/client";
import { CoordinateAnswerService } from "src/services/coordinate-answer.service";
import { MultipleChoiceAnswerService } from "src/services/multiple-choice-answer.service";
import { SingleChoiceAnswerService } from "src/services/single-choice-answer.service";
import { TextFieldAnswerService } from "src/services/text-field-answer.service";
import { IUserAnswerService } from "utils/interfaces/user-answer-service.interface";

@Injectable()
export class QuestTaskTypeRegistry {
  private strategies = new Map<QuestTaskType, IUserAnswerService>();

  constructor(
    @Inject(forwardRef(() => SingleChoiceAnswerService)) singleChoice: IUserAnswerService,
    @Inject(forwardRef(() => MultipleChoiceAnswerService)) multiChoice: IUserAnswerService,
    @Inject(forwardRef(() => TextFieldAnswerService)) textField: IUserAnswerService,
    @Inject(forwardRef(() => CoordinateAnswerService)) coordinateAnswer: IUserAnswerService,
  ) {
    this.strategies.set(QuestTaskType.SINGLE_CHOICE, singleChoice);
    this.strategies.set(QuestTaskType.MULTIPLE_CHOICE, multiChoice);
    this.strategies.set(QuestTaskType.TEXT_FIELD, textField);
    this.strategies.set(QuestTaskType.FIND_ON_MAP, coordinateAnswer);
    this.strategies.set(QuestTaskType.FIND_ON_PICTURE, coordinateAnswer);
  }

  getStrategy(type: QuestTaskType): IUserAnswerService {
    const strategy = this.strategies.get(type);
    if (!strategy) throw new NotFoundException(`Strategy not found for type: ${type}`);
    return strategy;
  }
}
