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


@Module({
  imports: [AuthModule, UserModule, PrismaModule, QuestModule, MediaModule, SingleChoiceTaskModule, QuestTaskModule, UserQuestProgressModule, UserAnswerModule, OptionModule],
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
],
})
export class AppModule {}
