import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QuestRunStatus, QuestTask, QuestTaskType, UserAnswer } from '@prisma/client';
import { UserAnswerRepository } from 'src/database/user-answer.repository';
import { QuestTaskService } from 'src/services/quest-task.service';
import { UserAnswerDTO } from '../dto/answer.dto';
import { UserQuestProgressService } from 'src/services/user-quest-progress.service';
import { QuestRunService } from 'src/services/quest-run.service';
import { UserAnswerWithOptions } from 'utils/types/userAnswerWithOptions';
import { QuestTaskTypeRegistry } from 'utils/strategies/quest-task-type.registry';
import { QuestRunGateway } from 'src/gateway/quest-run.gateway';
import { QuestRunResultDto } from 'src/dto/quest-run.result.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserAnswerService {
  constructor(
    private userAnswerRepository: UserAnswerRepository,
    private questTaskTypeRegistry: QuestTaskTypeRegistry,
    private questTaskService: QuestTaskService,
    private questRunService: QuestRunService,
    private userQuestProgressService: UserQuestProgressService,
    private questRunGateway: QuestRunGateway,
  ) {}

  async validateAnswer(taskId: string, answer: UserAnswerDTO): Promise<void> {
    const task = await this.questTaskService.findTaskById(taskId);
    const strategy = this.questTaskTypeRegistry.getStrategy(task.type);
    const isValid = strategy.validateAnswer(answer, task);
    if (!isValid) {
      throw new BadRequestException('Invalid answer');
    }
  }

  async submitAnswer(runId: string, userId: string, taskId: string, answer: UserAnswerDTO): Promise<UserAnswer> {
    await this.validateAnswer(taskId, answer);
    const progress = await this.userQuestProgressService.findProgress(runId, userId);
    const existingAnswer = await this.userAnswerRepository.getUserAnswer(progress.id, taskId);
    if (existingAnswer) {
      throw new ConflictException('Answer already submitted');
    }
    const result = await this.userAnswerRepository.create(progress.id, taskId, answer);
    await this.questRunGateway.sendUserAnswered(runId, taskId, userId);
    await this.checkIfAllAnswered(runId, taskId);
    return result;
  }

  private async checkIfAllAnswered(runId: string, taskId: string): Promise<void> {
    const allProgress = await this.userQuestProgressService.findProgressByRun(runId);
    const answeredUserIds = await this.userAnswerRepository.getAnsweredUserIds(runId, taskId);
    if (answeredUserIds.length === allProgress.length) {
      await this.questRunService.processNextTask(runId);
    }
  }

  async checkAnswers(runId: string): Promise<QuestRunResultDto> {
    let correctCount = 0;
    const run = await this.questRunService.getQuestRunById(runId);
    if (!(run.status === QuestRunStatus.COMPLETED)) {
      throw new BadRequestException('Run should be completed');
    }
    const answers = await this.userAnswerRepository.getAnswersByRun(runId);
    for (const answer of answers) {
      const task = await this.questTaskService.findTaskById(answer.id);
      if (task.type === QuestTaskType.INTERACTIVE_PLOT) continue;
      const checker = this.questTaskTypeRegistry.getStrategy(task.type);
      const progress = await this.userQuestProgressService.findProgressById(answer.progressId);
      if (!checker) continue;
      const isCorrect = await checker.checkAnswer(progress.id, task.id);
      if (isCorrect) correctCount++;
    }
    const tasks = await this.questTaskService.findTasksByQuest(run.questId);
    const scorableTasks  = tasks.filter((task) => task.type !== QuestTaskType.INTERACTIVE_PLOT);
    return {
      correctCount,
      total: tasks.length,
      score: this.calculateScorePercentage(correctCount, scorableTasks.length),
    };
  }

  @OnEvent('task.structure-updated')
  async recalculateTaskAnswers({ taskId }: { taskId: string }): Promise<void> {
    const task = await this.questTaskService.findTaskById(taskId);
    if (task.type === QuestTaskType.INTERACTIVE_PLOT) return;
    const checker = this.questTaskTypeRegistry.getStrategy(task.type);
    if (!checker) return;
    const answers = await this.userAnswerRepository.getAnswersByTask(taskId);
    const progressMap = new Map<string, number>();
    for (const answer of answers) {
      const { progressId } = answer;
      const isCorrect = await checker.checkAnswer(progressId, taskId);
      if (isCorrect) {
        progressMap.set(progressId, (progressMap.get(progressId) || 0) + 1);
      }
    }
    for (const [progressId, correctCount] of progressMap.entries()) {
      const progress = await this.userQuestProgressService.findProgressById(progressId);
      const run = await this.questRunService.getQuestRunById(progress.runId);
      const tasks = await this.questTaskService.findTasksByQuest(run.questId);
      const scorableTasks  = tasks.filter((task) => task.type !== QuestTaskType.INTERACTIVE_PLOT);
      const score = this.calculateScorePercentage(correctCount, scorableTasks.length);
      await this.userQuestProgressService.updateScore(progressId, score);
    }
  }

  calculateScorePercentage(correct: number, totalTasks: number): number {
    if (totalTasks === 0) return 0;
    return Math.round((correct / totalTasks) * 100);
  }

  async getUserAnswer(progressId: string, taskId: string): Promise<UserAnswerWithOptions> {
    const answer = await this.userAnswerRepository.getUserAnswer(progressId, taskId);
    if (!answer) {
      throw new NotFoundException('User answer is not found');
    }
    return answer;
  }
}
