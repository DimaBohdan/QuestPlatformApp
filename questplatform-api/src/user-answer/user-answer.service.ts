import { Injectable } from '@nestjs/common';
import { UserAnswer } from '@prisma/client';
import { UserAnswerRepository } from 'src/database/user-answer.repository';

@Injectable()
export class UserAnswerService {
  constructor(
    private userAnswerRepository: UserAnswerRepository,
  ) {}

  async create(userId: string, taskId: string, answer: string): Promise<UserAnswer> {
    return await this.userAnswerRepository.create(userId, taskId, answer);
  }
}
