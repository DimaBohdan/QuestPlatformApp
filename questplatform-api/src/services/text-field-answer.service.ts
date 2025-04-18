import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { QuestTaskService } from 'src/services/quest-task.service';
import { UserAnswerDTO } from 'src/dto/answer.dto';
import { UserAnswerService } from 'src/services/user-answer.service';
import { UserQuestProgressService } from 'src/services/user-quest-progress.service';
import { IUserAnswerService } from 'utils/interfaces/user-answer-service.interface';

@Injectable()
export class TextFieldAnswerService implements IUserAnswerService {
  constructor(
    @Inject(forwardRef(() => UserAnswerService))
    private userAnswerService: UserAnswerService,
    private questTaskService: QuestTaskService,
    private userQuestProgressService: UserQuestProgressService,
  ) {}

  validateAnswer(answer: UserAnswerDTO): boolean {
    return Array.isArray(answer.selectedOptions) && answer.selectedOptions.length > 0;
  }

  async checkAnswer(progressId: string, taskId: string): Promise<boolean> {
    await this.userQuestProgressService.findProgressById(progressId);
    const answer = await this.userAnswerService.getUserAnswer(progressId, taskId);
    const userText = answer.textAnswer?.trim().toLowerCase();
    if (!userText) return false;
    const task = await this.questTaskService.findTaskById(taskId);
    const correctAnswers = task.textAnswer;
    const correctTexts = correctAnswers.map(text => text.trim().toLowerCase());
    return correctTexts.includes(userText);
  }
}
