import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestTask, UserAnswer, UserQuestProgress } from '@prisma/client';
import { UserAnswerRepository } from 'src/database/user-answer.repository';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { UserAnswerDTO } from './dto/answer.dto';
import { AnswerValidatorFactory } from 'utils/validators/answer.validator.factory';
import { UserQuestProgressService } from 'src/user-quest-progress/user-quest-progress.service';
import { QuestRunService } from 'src/quest-run/quest-run.service';

@Injectable()
export class UserAnswerService {
  constructor(
    private userAnswerRepository: UserAnswerRepository,
    private questTaskService: QuestTaskService,
    private questRunService: QuestRunService,
    private userQuestProgressService: UserQuestProgressService,
  ) {}

  private validateAnswer(answer: UserAnswerDTO, task: QuestTask): boolean {
    const validator = AnswerValidatorFactory.getValidator(task.type);
    return validator.validate(answer);
  }

  async submitAnswer(runId: string, userId: string, taskId: string, answer: UserAnswerDTO): Promise<UserAnswer> {
    const task = await this.questTaskService.findTaskById(taskId);
    const progress = await this.userQuestProgressService.findProgress(runId, userId);
    if (!this.validateAnswer(answer, task)) {
      throw new BadRequestException('Invalid answer provided');
    }
    const result = await this.userAnswerRepository.create(progress.id, taskId, answer);
    const allProgress = await this.userQuestProgressService.findProgressByRun(runId);
    const answeredUserIds = await this.userAnswerRepository.getAnsweredUserIds(runId, taskId);
    if (answeredUserIds.length === allProgress.length) {
      await this.questRunService.processNextTask(runId);
    }
    return result;
  }
}
