import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserAnswerDTO } from 'src/dto/answer.dto';
import { UserQuestProgressService } from 'src/services/user-quest-progress.service';
import { IUserAnswerService } from 'utils/interfaces/user-answer-service.interface';
import { UserAnswerService } from 'src/services/user-answer.service';

@Injectable()
export class SingleChoiceAnswerService implements IUserAnswerService {
  constructor(
    @Inject(forwardRef(() => UserAnswerService))
    private userAnswerService: UserAnswerService,
    private userQuestProgressService: UserQuestProgressService,
  ) {}

  validateAnswer(answer: UserAnswerDTO): boolean {
    return Array.isArray(answer.selectedOptions) && answer.selectedOptions.length === 1;
  }

  async checkAnswer(progressId: string, taskId: string): Promise<boolean> {
    await this.userQuestProgressService.findProgressById(progressId);
    const answer = await this.userAnswerService.getUserAnswer(progressId, taskId);
    const selectedOption = answer.selectedOptions[0];
    const isCorrect = selectedOption.option.isCorrect ?? false;
    return isCorrect ? true: false;
  }
}
