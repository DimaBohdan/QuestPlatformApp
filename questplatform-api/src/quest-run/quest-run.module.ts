import { forwardRef, Module } from '@nestjs/common';
import { QuestRunService } from './quest-run.service';
import { QuestRunController } from './quest-run.controller';
import { UserQuestProgressModule } from 'src/user-quest-progress/user-quest-progress.module';
import { TaskTimerModule } from 'src/task-timer/task-timer.module';
import { QuestRunRepository } from 'src/database/quest-run.repository';
import { QuestRunGateway } from './quest-run.gateway';
import { QuestModule } from 'src/quest/quest.module';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';

@Module({
  imports: [forwardRef(() => UserQuestProgressModule), forwardRef(() => TaskTimerModule), forwardRef(() => QuestModule), forwardRef(() => QuestTaskModule)],
  providers: [QuestRunService, QuestRunGateway, QuestRunRepository],
  controllers: [QuestRunController],
  exports: [QuestRunService, QuestRunGateway, QuestRunRepository]
})
export class QuestRunModule {}
