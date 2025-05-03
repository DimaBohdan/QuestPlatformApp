import { forwardRef, Module } from '@nestjs/common';
import { UserAnswerService } from '../services/user-answer.service';
import { UserAnswerController } from '../controllers/user-answer.controller';
import { UserAnswerRepository } from 'src/database/user-answer.repository';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestRunModule } from 'src/modules/quest-run.module';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';
import { QuestTaskTypeRegistry } from 'utils/strategies/quest-task-type.registry';
import { SingleChoiceAnswerModule } from 'src/modules/single-choice-answer.module';
import { MultipleChoiceAnswerModule } from 'src/modules/multiple-choice-answer.module';
import { TextFieldAnswerModule } from 'src/modules/text-field-answer.module';
import { CoordinateAnswerModule } from 'src/modules/coordinate-answer.module';
import { InteractivePlotAnswerModule } from './interactive-plot-answer.module';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => QuestTaskModule),
    forwardRef(() => QuestRunModule),
    UserQuestProgressModule,
    forwardRef(() => SingleChoiceAnswerModule),
    forwardRef(() => MultipleChoiceAnswerModule),
    forwardRef(() => TextFieldAnswerModule),
    forwardRef(() => CoordinateAnswerModule),
    forwardRef(() => InteractivePlotAnswerModule),
    JwtModule,
    PermissionModule, 
    forwardRef(() => QuestModule),
  ],
  providers: [UserAnswerService, UserAnswerRepository, QuestTaskTypeRegistry],
  controllers: [UserAnswerController],
  exports: [UserAnswerService, UserAnswerRepository],
})
export class UserAnswerModule {}
