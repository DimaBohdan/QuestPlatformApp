import { forwardRef, Module } from '@nestjs/common';
import { QuestTaskController } from './quest-task.controller';
import { QuestTaskService } from './quest-task.service';
import { QuestTaskRepository } from 'src/database/task.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/media/media.module';
import { QuestModule } from 'src/quest/quest.module';
import { QuestService } from 'src/quest/quest.service';
import { MediaService } from 'src/media/media.service';
import { UserQuestProgressModule } from 'src/user-quest-progress/user-quest-progress.module';
import { UserAnswerModule } from 'src/user-answer/user-answer.module';
import { QuestGateway } from 'src/quest/quest.gateway';
import { OptionModule } from 'src/option/option.module';
import { TaskCleanerFactory } from './task-cleaner/task-cleaner.factory';
import { ChoiceCleaner } from 'utils/task-cleaner/choice-cleaner';
import { DefaultCleaner } from 'utils/task-cleaner/default-cleaner';

@Module({
  imports: [PrismaModule, forwardRef(() => QuestModule), forwardRef(() => OptionModule), forwardRef(() => UserQuestProgressModule), forwardRef(() => UserAnswerModule), MediaModule],
  controllers: [QuestTaskController],
  providers: [QuestTaskService, QuestTaskRepository, QuestService, MediaService, QuestGateway, TaskCleanerFactory, ChoiceCleaner, DefaultCleaner],
  exports: [QuestTaskService, QuestTaskRepository],
})
export class QuestTaskModule {}
