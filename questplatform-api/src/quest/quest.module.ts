import { forwardRef, Module } from '@nestjs/common';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';
import { QuestRepository } from 'src/database/quest.repository';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { MediaModule } from 'src/media/media.module';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { UserQuestProgressModule } from 'src/user-quest-progress/user-quest-progress.module';
import { UserAnswerModule } from 'src/user-answer/user-answer.module';
import { QuestGateway } from './quest.gateway';

@Module({
  imports: [PrismaModule, AuthModule, MediaModule, forwardRef(() => QuestTaskModule), UserQuestProgressModule, UserAnswerModule],
  controllers: [QuestController],
  providers: [QuestService, QuestRepository, JwtAuthGuard],
  exports: [QuestService, QuestRepository],
})
export class QuestModule {}
