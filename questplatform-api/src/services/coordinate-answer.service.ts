import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CoordinateService } from 'src/services/coordinate.service';
import { QuestTaskService } from 'src/services/quest-task.service';
import { UserAnswerDTO } from 'src/dto/answer.dto';
import { UserAnswerService } from 'src/services/user-answer.service';
import { UserQuestProgressService } from 'src/services/user-quest-progress.service';
import { IUserAnswerService } from 'utils/interfaces/user-answer-service.interface';

@Injectable()
export class CoordinateAnswerService implements IUserAnswerService {
  constructor(
    @Inject(forwardRef(() => UserAnswerService))
    private userAnswerService: UserAnswerService,
    private questTaskService: QuestTaskService,
    private userQuestProgressService: UserQuestProgressService,
    private coordinateService: CoordinateService,
  ) {}

  async validateAnswer(answer: UserAnswerDTO): Promise<boolean> {
    if (!answer.selectedCoordsId) {
      throw new BadRequestException('No selectedd coordinates provided');
    }
    const coordinate = await this.coordinateService.getCoordinateById(answer.selectedCoordsId);
    return (
      typeof coordinate.positionX === 'number' &&
      typeof coordinate.positionY === 'number'
    );
  }

  async checkAnswer(runId: string, userId: string, taskId: string): Promise<boolean> {
    const progress = await this.userQuestProgressService.findProgress(runId, userId);
    const answer = await this.userAnswerService.getUserAnswer(progress.id, taskId);
    const task = await this.questTaskService.findTaskById(taskId);
    if (!answer.selectedCoordsId) {
      throw new BadRequestException('No selectedd coordinates provided');
    }
    const coordinate = await this.coordinateService.getCoordinateById(answer.selectedCoordsId);
    const answerCoord = await this.coordinateService.getCoordinateByTask(taskId);
    const userX = coordinate.positionX;
    const userY = coordinate.positionY;
    const correctX = answerCoord.positionX;
    const correctY = answerCoord.positionY;
    const radius = answerCoord.radius;
    const distance = Math.sqrt(Math.pow(userX - correctX, 2) + Math.pow(userY - correctY, 2));
    return distance <= radius;
  }
}
