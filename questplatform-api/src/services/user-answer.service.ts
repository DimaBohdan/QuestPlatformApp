import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserAnswer } from '@prisma/client';
import { UserAnswerRepository } from 'src/database/user-answer.repository';
import { QuestTaskService } from 'src/services/quest-task.service';
import { UserAnswerDTO } from '../dto/answer.dto';
import { UserQuestProgressService } from 'src/services/user-quest-progress.service';
import { QuestRunService } from 'src/services/quest-run.service';
import { UserAnswerWithOptions } from 'utils/types/userAnswerWithOptions';
import { QuestTaskTypeRegistry } from 'utils/strategies/quest-task-type.pool';

@Injectable()
export class UserAnswerService {
  constructor(
    private userAnswerRepository: UserAnswerRepository,
    private questTaskTypeRegistry: QuestTaskTypeRegistry,
    private questTaskService: QuestTaskService,
    private questRunService: QuestRunService,
    private userQuestProgressService: UserQuestProgressService,
  ) {}

  async submitAnswer(runId: string, userId: string, taskId: string, answer: UserAnswerDTO): Promise<UserAnswer> {
    const task = await this.questTaskService.findTaskById(taskId);
    const strategy = this.questTaskTypeRegistry.getStrategy(task.type);
    const isValid = strategy.validateAnswer(answer, task);
    if (!isValid) {
      throw new BadRequestException('Invalid answer');
    }
    const progress = await this.userQuestProgressService.findProgress(runId, userId);
    const result = await this.userAnswerRepository.create(progress.id, taskId, answer);
    const allProgress = await this.userQuestProgressService.findProgressByRun(runId);
    const answeredUserIds = await this.userAnswerRepository.getAnsweredUserIds(runId, taskId);
    if (answeredUserIds.length === allProgress.length) {
      await this.questRunService.processNextTask(runId);
    }
    return result;
  }

  async getUserAnswer(progressId: string, taskId: string): Promise<UserAnswerWithOptions> {
    const answer = await this.userAnswerRepository.getUserAnswer(progressId, taskId);
    if (!answer) {
      throw new NotFoundException('User answer is not found');
    }
    return answer;
  }
}
