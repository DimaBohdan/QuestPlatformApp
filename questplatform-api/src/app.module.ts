import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { RolesGuard } from 'utils/guards/roles.guard';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { QuestModule } from './quest/quest.module';
import { MediaModule } from './media/media.module';
import { SingleChoiceTaskModule } from './single-choice-task/single-choice-task.module';
import { QuestTaskModule } from './quest-task/quest-task.module';
import { UserQuestProgressService } from './user-quest-progress/user-quest-progress.service';
import { UserQuestProgressController } from './user-quest-progress/user-quest-progress.controller';
import { UserQuestProgressModule } from './user-quest-progress/user-quest-progress.module';
import { UserAnswerModule } from './user-answer/user-answer.module';
import { QuestTaskService } from './quest-task/quest-task.service';
import { QuestTaskController } from './quest-task/quest-task.controller';
import { OptionModule } from './option/option.module';
import { QuestGateway } from './quest/quest.gateway';
import { QuestViewModule } from './quest-view/quest-view.module';
import { MultipleChoiceTaskModule } from './multiple-choice-task/multiple-choice-task.module';
import { OptionService } from './option/option.service';
import { TaskCleanerFactory } from './quest-task/task-cleaner/task-cleaner.factory';
import { ChoiceCleaner } from 'utils/task-cleaner/choice-cleaner';
import { DefaultCleaner } from 'utils/task-cleaner/default-cleaner';
import { TextFieldTaskModule } from './text-field-task/text-field-task.module';
import { FindOnPictureTaskModule } from './find-on-picture-task/find-on-picture-task.module';
import { CoordinateModule } from './coordinate/coordinate.module';
import { FindOnMapTaskModule } from './find-on-map-task/find-on-map-task.module';
import { InteractivePlotTaskModule } from './interactive-plot-task/interactive-plot-task.module';
import { PlotNodeModule } from './plot-node/plot-node.module';
import { FriendshipModule } from './friendship/friendship.module';


@Module({
  imports: [AuthModule, UserModule, PrismaModule, QuestModule, MediaModule, SingleChoiceTaskModule, QuestTaskModule, UserQuestProgressModule, UserAnswerModule, OptionModule, QuestViewModule, MultipleChoiceTaskModule, TextFieldTaskModule, FindOnPictureTaskModule, CoordinateModule, FindOnMapTaskModule, InteractivePlotTaskModule, PlotNodeModule, FriendshipModule],
  controllers: [AuthController, UserController, QuestTaskController, UserQuestProgressController],
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
  QuestGateway,
  TaskCleanerFactory,
  ChoiceCleaner,
  DefaultCleaner,
],
})
export class AppModule {}
