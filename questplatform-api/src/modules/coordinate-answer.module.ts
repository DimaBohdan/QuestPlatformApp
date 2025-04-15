import { forwardRef, Module } from '@nestjs/common';
import { CoordinateAnswerService } from '../services/coordinate-answer.service';
import { UserAnswerModule } from 'src/modules/user-answer.module';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';
import { CoordinateModule } from 'src/modules/coordinate.module';
import { QuestTaskModule } from 'src/modules/quest-task.module';

@Module({
  imports: [forwardRef(() => UserAnswerModule), forwardRef(() => QuestTaskModule), UserQuestProgressModule, CoordinateModule],
  providers: [CoordinateAnswerService],
  exports: [CoordinateAnswerService],
})
export class CoordinateAnswerModule {}
