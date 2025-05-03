import { Injectable } from '@nestjs/common';
import { UserAnswerDTO } from 'src/dto/answer.dto';

@Injectable()
export class InteractivePlotAnswerService {
  constructor() {}

  validateAnswer(answer: UserAnswerDTO): boolean {
    return Array.isArray(answer.plotChoiceId) && answer.plotChoiceId.length === 1;
  }
}
