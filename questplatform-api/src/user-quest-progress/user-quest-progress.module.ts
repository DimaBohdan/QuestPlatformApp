import { forwardRef, Module } from '@nestjs/common';
import { UserQuestProgressController } from './user-quest-progress.controller';
import { UserQuestProgressService } from './user-quest-progress.service';
import { UserQuestProgressRepository } from 'src/database/user-quest-progress.repository';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';

@Module({
  imports: [forwardRef(() => QuestTaskModule)],
  controllers: [UserQuestProgressController],
  providers: [UserQuestProgressService, UserQuestProgressRepository],
  exports: [UserQuestProgressService, UserQuestProgressRepository]
})
export class UserQuestProgressModule {}
