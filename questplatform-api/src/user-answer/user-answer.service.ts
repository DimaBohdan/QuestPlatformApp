import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestTask, UserAnswer } from '@prisma/client';
import { UserAnswerRepository } from 'src/database/user-answer.repository';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { UserAnswerDTO } from './dto/answer.dto';
import { AnswerValidatorFactory } from 'utils/validators/answer.validator.factory';

@Injectable()
export class UserAnswerService {
  constructor(
    private userAnswerRepository: UserAnswerRepository,
    private questTaskService: QuestTaskService,
  ) {}

  private validateAnswer(answer: UserAnswerDTO, task: QuestTask): boolean {
    const validator = AnswerValidatorFactory.getValidator(task.type);
    return validator.validate(answer);
  }  

  async create(userId: string, taskId: string, answer: UserAnswerDTO): Promise<UserAnswer> {
    const task = await this.questTaskService.findTaskById(taskId);
    if (!this.validateAnswer(answer, task)) {
      throw new BadRequestException('Invalid answer provided');
    }
    return await this.userAnswerRepository.create(userId, taskId, answer );
  }
}
