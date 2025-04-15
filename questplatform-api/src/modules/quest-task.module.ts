import { forwardRef, Module } from '@nestjs/common';
import { QuestTaskController } from 'src/controllers/quest-task.controller';
import { QuestTaskService } from '../services/quest-task.service';
import { QuestTaskRepository } from 'src/database/task.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/modules/media.module';
import { QuestModule } from 'src/modules/quest.module';
import { QuestService } from 'src/services/quest.service';
import { MediaService } from 'src/services/media.service';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';
import { UserAnswerModule } from 'src/modules/user-answer.module';
import { QuestGateway } from 'src/gateway/quest.gateway';
import { OptionModule } from 'src/modules/option.module';
import { TaskCleanerFactory } from '../gateway/task-cleaner.factory';
import { ChoiceCleaner } from 'utils/task-cleaner/choice-cleaner';
import { DefaultCleaner } from 'utils/task-cleaner/text-cleaner';

@Module({
  imports: [PrismaModule, forwardRef(() => QuestModule), forwardRef(() => OptionModule), forwardRef(() => UserQuestProgressModule), forwardRef(() => UserAnswerModule), MediaModule],
  controllers: [QuestTaskController],
  providers: [QuestTaskService, QuestTaskRepository, QuestService, MediaService, QuestGateway, TaskCleanerFactory, ChoiceCleaner, DefaultCleaner],
  exports: [QuestTaskService, QuestTaskRepository],
})
export class QuestTaskModule {}
