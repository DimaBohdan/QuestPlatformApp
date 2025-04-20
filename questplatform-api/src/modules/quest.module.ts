import { forwardRef, Module } from '@nestjs/common';
import { QuestController } from '../controllers/quest.controller';
import { QuestService } from '../services/quest.service';
import { QuestRepository } from 'src/database/quest.repository';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/modules/auth.module';
import { MediaModule } from 'src/modules/media.module';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';
import { UserAnswerModule } from 'src/modules/user-answer.module';

@Module({
  imports: [PrismaModule, AuthModule, MediaModule, forwardRef(() => QuestTaskModule), UserQuestProgressModule, UserAnswerModule],
  controllers: [QuestController],
  providers: [QuestService, QuestRepository, JwtAuthGuard],
  exports: [QuestService, QuestRepository],
})
export class QuestModule {}
