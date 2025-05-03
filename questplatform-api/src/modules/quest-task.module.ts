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
import { OptionModule } from 'src/modules/option.module';
import { TaskCleanerRegistry } from 'utils/strategies/task-cleaner.registry';
import { CoordinateModule } from './coordinate.module';
import { CoordinateCleaner } from 'utils/task-cleaner/coordinate-cleaner';
import { TextCleaner } from 'utils/task-cleaner/text-cleaner';
import { OptionCleaner } from 'utils/task-cleaner/option-cleaner';
import { PlotCleaner } from 'utils/task-cleaner/plot-cleaner';
import { PlotNodeModule } from './plot-node.module';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';

@Module({
  imports: [PrismaModule, JwtModule, PermissionModule, forwardRef(() => QuestModule), forwardRef(() => OptionModule), forwardRef(() => UserQuestProgressModule), forwardRef(() => UserAnswerModule), PlotNodeModule, MediaModule, CoordinateModule],
  controllers: [QuestTaskController],
  providers: [QuestTaskService, QuestTaskRepository, QuestService, MediaService, OptionCleaner, CoordinateCleaner, TaskCleanerRegistry, TextCleaner, PlotCleaner, JwtAuthGuard],
  exports: [QuestTaskService, QuestTaskRepository],
})
export class QuestTaskModule {}
