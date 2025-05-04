import { BadRequestException, ConflictException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { QuestRun, QuestRunStatus, QuestStatus, QuestTask, UserQuestProgress } from "@prisma/client";
import { QuestRunRepository } from "src/database/quest-run.repository";
import { QuestTaskService } from "src/services/quest-task.service";
import { QuestService } from "src/services/quest.service";
import { TaskTimerService } from "src/services/task-timer.service";
import { UserQuestProgressService } from "src/services/user-quest-progress.service";
import { QuestRunGateway } from "../gateway/quest-run.gateway";
import { LeaderboardItemDto } from "src/dto/leaderboard-item";

@Injectable()
export class QuestRunService {
  constructor(
    private questRunRepository: QuestRunRepository, 
    @Inject(forwardRef(() => UserQuestProgressService))
    private userQuestProgressService: UserQuestProgressService,
    @Inject(forwardRef(() => QuestService))
    private questService: QuestService,
    private taskService: QuestTaskService,
    @Inject(forwardRef(() => TaskTimerService))
    private taskTimerService: TaskTimerService,
    private questRunGateway: QuestRunGateway,
  ) {}

  async startSinglePlayer(questId: string, userId: string): Promise<QuestRun> {
    const quest = await this.questService.findQuestById(questId);
    if (quest.quest_status === QuestStatus.DRAFT) {
      throw new BadRequestException('Quest is still in draft and cannot be played');
    }
    if (QuestStatus.READY && quest.authorId !== userId) {
      throw new ForbiddenException('Only the author can play this quest');
    }
    const run = await this.questRunRepository.createSingleRun(questId, userId);
    await this.userQuestProgressService.joinSinglePlayer(run.id, userId);
    return run;
  }

  async startMultiplayer(questId: string, userId: string): Promise<QuestRun> {
    const quest = await this.questService.findQuestById(questId);
    if (quest.quest_status !== QuestStatus.PUBLISHED) {
      throw new BadRequestException('Only published quests can be used for multiplayer');
    }
    await this.questService.findQuestById(questId);
    const code = this.generateCode();
    return await this.questRunRepository.createMultipleRun(questId, userId, code);
  }

  async launchRun(runId: string): Promise<QuestRun> {
    const run = await this.getQuestRunById(runId);
    if (run.status !== QuestRunStatus.INACTIVE) {
      throw new ConflictException('Quest has already started or finished');
    }
    await this.questRunRepository.startRun(runId);
    const quest = await this.questService.findQuestById(run.questId);
    const result = await this.processNextTask(runId);
    this.questRunGateway.sendQuestStarted(runId);
    return result;
  }

  async completeRun(runId: string): Promise<QuestRun> {
    const run = await this.getQuestRunById(runId);
    if (run.status == QuestRunStatus.COMPLETED) {
      throw new ConflictException('Quest has already finished');
    }
    this.questRunGateway.sendQuestCompleted(runId);
    return await this.questRunRepository.completeRun(runId);
  }

  async getLeaderboard(runId: string): Promise<LeaderboardItemDto[]> {
    const runs = await this.userQuestProgressService.findProgressByRun(runId);
    return runs.map(run => ({
      userId: run.userId,
      score: run.score,
    }));  
  }

  async getCurrentTask(runId: string, userId: string): Promise<QuestTask> {
    await this.userQuestProgressService.findProgress(runId, userId);
    const run = await this.getQuestRunById(runId);
    const quest = await this.questService.findQuestById(run.questId);
    const tasks = await this.taskService.findTasksByQuest(quest.id);
    return tasks[run.currentTaskIndex];
  }

  async processNextTask(runId: string): Promise<QuestRun> {
    const run = await this.getQuestRunById(runId);
    const nextIndex = run.currentTaskIndex + 1;
    const nextTask = await this.taskService.findTaskByIndex(run.questId, nextIndex);
    if (!nextTask) {
      return this.completeRun(runId);
    }
    const updatedRun = await this.questRunRepository.processNextTask(runId);
    if (nextTask.time) {
      this.taskTimerService.setTimer(runId, nextIndex, nextTask.time * 1000);
    }
    this.questRunGateway.sendTaskUpdate(runId, nextTask);
    return updatedRun;
  }

  private generateCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async getQuestRunById(runId: string): Promise<QuestRun> {
    const run = await this.questRunRepository.getQuestRunById(runId);
    if (!run) {
      throw new NotFoundException('Quest run not found by this session code');
    }
    return run;
  }

  async findBySessionCode(code: string): Promise<QuestRun> {
    const questRun = await this.questRunRepository.findBySessionCode(code);
    if (!questRun) {
      throw new NotFoundException('Quest run not found by this session code');
    }
    return questRun
  }
}
