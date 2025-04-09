import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { QuestRunStatus, UserQuestProgress } from "@prisma/client";
import { UserQuestProgressRepository } from "src/database/user-quest-progress.repository";
import { QuestRunGateway } from "src/quest-run/quest-run.gateway";
import { QuestRunService } from "src/quest-run/quest-run.service";

@Injectable()
export class UserQuestProgressService {
  constructor(
    private progressRepository: UserQuestProgressRepository,
    @Inject(forwardRef(() => QuestRunService))
    private questRunService: QuestRunService,
    private questRunGateway: QuestRunGateway,
  ) {}

  async joinMultiplayer(sessionCode: string, userId: string): Promise<UserQuestProgress> {
    const run = await this.questRunService.findBySessionCode(sessionCode);
    if (run.status == QuestRunStatus.INACTIVE) {
      this.questRunGateway.sendUserJoined(run.id, userId);
      return await this.createProgress(run.id, userId);
    }
    else {
      throw new BadRequestException('Multiplayer quest run cannot be joined')
    }
  }

  async joinSinglePlayer(runId: string, userId: string): Promise<UserQuestProgress> {
    const run = await this.questRunService.getQuestRunById(runId);
    if (run.status == QuestRunStatus.INACTIVE) {
      this.questRunGateway.sendUserJoined(run.id, userId);
      return await this.createProgress(run.id, userId);
    }
    else {
      throw new BadRequestException('Singleplayer quest run cannot be joined')
    }
  }

  async createProgress(runId: string, userId: string): Promise<UserQuestProgress> {
    const progress = await this.findProgress(runId, userId);
    if (progress) {
      throw new BadRequestException('Already existing user progress');
    }
    return await this.progressRepository.createProgress(userId, runId);
  }

  async findProgressByRun(runId: string): Promise<UserQuestProgress[]> {
    return await this.progressRepository.findProgressByRun(runId);
  }

  async findProgress(runId: string, userId: string): Promise<UserQuestProgress> {
    const progress = await this.progressRepository.findProgress(userId, runId);
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }
    return progress;
  }
}
