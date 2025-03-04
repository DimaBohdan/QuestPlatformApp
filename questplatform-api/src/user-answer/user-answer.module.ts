import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';

@Module({
  providers: [UserAnswerService],
  controllers: [UserAnswerController]
})
export class UserAnswerModule {}
