import { forwardRef, Module } from '@nestjs/common';
import { UserQuestProgressController } from './user-quest-progress.controller';
import { UserQuestProgressService } from './user-quest-progress.service';
import { UserQuestProgressRepository } from 'src/database/user-quest-progress.repository';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { QuestRunModule } from 'src/quest-run/quest-run.module';

@Module({
  imports: [forwardRef(() => QuestTaskModule), forwardRef(() => QuestRunModule),],
  controllers: [UserQuestProgressController],
  providers: [UserQuestProgressService, UserQuestProgressRepository],
  exports: [UserQuestProgressService, UserQuestProgressRepository]
})
export class UserQuestProgressModule {}
