import { forwardRef, Module } from '@nestjs/common';
import { QuestRunService } from '../services/quest-run.service';
import { QuestRunController } from '../controllers/quest-run.controller';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';
import { TaskTimerModule } from 'src/modules/task-timer.module';
import { QuestRunRepository } from 'src/database/quest-run.repository';
import { QuestRunGateway } from '../gateway/quest-run.gateway';
import { QuestModule } from 'src/modules/quest.module';
import { QuestTaskModule } from 'src/modules/quest-task.module';

@Module({
  imports: [forwardRef(() => UserQuestProgressModule), forwardRef(() => TaskTimerModule), forwardRef(() => QuestModule), forwardRef(() => QuestTaskModule)],
  providers: [QuestRunService, QuestRunGateway, QuestRunRepository],
  controllers: [QuestRunController],
  exports: [QuestRunService, QuestRunGateway, QuestRunRepository]
})
export class QuestRunModule {}
