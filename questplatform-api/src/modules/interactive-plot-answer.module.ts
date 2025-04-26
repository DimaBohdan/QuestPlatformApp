import { forwardRef, Module } from '@nestjs/common';
import { UserAnswerModule } from 'src/modules/user-answer.module';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';
import { InteractivePlotAnswerService } from 'src/services/interactive-plot-answer.service';

@Module({
  imports: [forwardRef(() => UserAnswerModule), UserQuestProgressModule],
  providers: [InteractivePlotAnswerService],
  exports: [InteractivePlotAnswerService],
})
export class InteractivePlotAnswerModule {}