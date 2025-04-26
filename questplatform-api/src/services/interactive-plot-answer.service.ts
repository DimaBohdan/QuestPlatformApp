import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserAnswerDTO } from 'src/dto/answer.dto';
import { UserQuestProgressService } from 'src/services/user-quest-progress.service';
import { UserAnswerService } from 'src/services/user-answer.service';

@Injectable()
export class InteractivePlotAnswerService {
  constructor(
    @Inject(forwardRef(() => UserAnswerService))
    private readonly userAnswerService: UserAnswerService,
    private readonly userQuestProgressService: UserQuestProgressService,
  ) {}

  validateAnswer(answer: UserAnswerDTO): boolean {
    return Array.isArray(answer.plotChoiceId) && answer.plotChoiceId.length === 1;
  }
}
