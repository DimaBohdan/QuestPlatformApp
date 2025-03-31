import { forwardRef, Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { UserAnswerRepository } from 'src/database/user-answer.repository';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { QuestTaskRepository } from 'src/database/task.repository';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, forwardRef(() => QuestTaskModule),],
  providers: [UserAnswerService, UserAnswerRepository],
  controllers: [UserAnswerController],
  exports: [UserAnswerService, UserAnswerRepository],
})
export class UserAnswerModule {}
