import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserAnswerDTO } from 'src/dto/answer.dto';
import { UserQuestProgressService } from 'src/services/user-quest-progress.service';
import { IUserAnswerService } from 'utils/interfaces/user-answer-service.interface';
import { UserAnswerService } from 'src/services/user-answer.service';
import { OptionService } from 'src/services/option.service';

@Injectable()
export class MultipleChoiceAnswerService implements IUserAnswerService {
  constructor(
    @Inject(forwardRef(() => UserAnswerService))
    private userAnswerService: UserAnswerService,
    private userQuestProgressService: UserQuestProgressService,
    private optionService: OptionService,
  ) {}

  validateAnswer(answer: UserAnswerDTO): boolean {
    return Array.isArray(answer.selectedOptions) && answer.selectedOptions.length > 0;
  }

  async checkAnswer(progressId: string, taskId: string): Promise<boolean> {
    await this.userQuestProgressService.findProgressById(progressId);
    const answer = await this.userAnswerService.getUserAnswer(progressId, taskId);
    const selectedOptions = answer.selectedOptions ?? [];
    if (selectedOptions.length === 0) return false;
    const selectedIds = selectedOptions.map(opt => opt.option.id).sort();
    const allOptions = await this.optionService.getOptionsByTaskId(taskId);
    const correctIds = allOptions
      .filter(opt => opt.isCorrect)
      .map(opt => opt.id)
      .sort();
    const isCorrect = selectedIds.length === correctIds.length && selectedIds.every((id, index) => id === correctIds[index]);
    return isCorrect;
  }
}
