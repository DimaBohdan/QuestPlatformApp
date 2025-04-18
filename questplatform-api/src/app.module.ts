import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserModule } from './modules/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { RolesGuard } from 'utils/guards/roles.guard';
import { AuthController } from './controllers/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { QuestModule } from './modules/quest.module';
import { MediaModule } from './modules/media.module';
import { SingleChoiceTaskModule } from './modules/single-choice-task.module';
import { QuestTaskModule } from './modules/quest-task.module';
import { UserQuestProgressService } from './services/user-quest-progress.service';
import { UserQuestProgressModule } from './modules/user-quest-progress.module';
import { UserAnswerModule } from './modules/user-answer.module';
import { QuestTaskService } from './services/quest-task.service';
import { OptionModule } from './modules/option.module';
import { QuestViewModule } from './modules/quest-view.module';
import { MultipleChoiceTaskModule } from './modules/multiple-choice-task.module';
import { ChoiceCleaner } from 'utils/task-cleaner/choice-cleaner';
import { TextFieldTaskModule } from './modules/text-field-task.module';
import { FindOnPictureTaskModule } from './modules/find-on-picture-task.module';
import { CoordinateModule } from './modules/coordinate.module';
import { FindOnMapTaskModule } from './modules/find-on-map-task.module';
import { InteractivePlotTaskModule } from './modules/interactive-plot-task.module';
import { PlotNodeModule } from './modules/plot-node.module';
import { FriendshipModule } from './modules/friendship.module';
import { QuestRunModule } from './modules/quest-run.module';
import { TaskTimerModule } from './modules/task-timer.module';
import { SingleChoiceAnswerModule } from './modules/single-choice-answer.module';
import { MultipleChoiceAnswerModule } from './modules/multiple-choice-answer.module';
import { TextFieldAnswerModule } from './modules/text-field-answer.module';
import { CoordinateAnswerModule } from './modules/coordinate-answer.module';
import { QuestReviewModule } from './modules/quest-review.module';
import { TaskCleanerRegistry } from 'utils/strategies/task-cleaner.registry';
import { CoordinateCleaner } from 'utils/task-cleaner/coordinate-cleaner';
import { TextCleaner } from 'utils/task-cleaner/text-cleaner';
import { EventEmitterModule } from '@nestjs/event-emitter';


@Module({
  imports: [EventEmitterModule.forRoot(), AuthModule, UserModule, PrismaModule, QuestModule, MediaModule, SingleChoiceTaskModule, QuestTaskModule, UserQuestProgressModule, UserAnswerModule, OptionModule, QuestViewModule, MultipleChoiceTaskModule, TextFieldTaskModule, FindOnPictureTaskModule, CoordinateModule, FindOnMapTaskModule, InteractivePlotTaskModule, PlotNodeModule, FriendshipModule, QuestRunModule, TaskTimerModule, SingleChoiceAnswerModule, MultipleChoiceAnswerModule, TextFieldAnswerModule, CoordinateAnswerModule, QuestReviewModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  UserService,
  UserQuestProgressService,
  QuestTaskService,
  ChoiceCleaner,
  TaskCleanerRegistry,
  CoordinateCleaner,
  TextCleaner,
],
})
export class AppModule {}
