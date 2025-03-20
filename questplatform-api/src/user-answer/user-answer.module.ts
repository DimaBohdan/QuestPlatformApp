import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { UserAnswerRepository } from 'src/database/user-answer.repository';

@Module({
  providers: [UserAnswerService, UserAnswerRepository],
  controllers: [UserAnswerController],
  exports: [UserAnswerService, UserAnswerRepository],
})
export class UserAnswerModule {}
