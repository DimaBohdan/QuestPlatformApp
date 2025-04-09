import { forwardRef, Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { UserAnswerRepository } from 'src/database/user-answer.repository';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestRunModule } from 'src/quest-run/quest-run.module';
import { UserQuestProgressModule } from 'src/user-quest-progress/user-quest-progress.module';

@Module({
  imports: [PrismaModule, forwardRef(() => QuestTaskModule), forwardRef(() => QuestRunModule), UserQuestProgressModule],
  providers: [UserAnswerService, UserAnswerRepository],
  controllers: [UserAnswerController],
  exports: [UserAnswerService, UserAnswerRepository],
})
export class UserAnswerModule {}
