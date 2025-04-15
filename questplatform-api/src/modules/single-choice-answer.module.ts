import { forwardRef, Module } from '@nestjs/common';
import { SingleChoiceAnswerService } from '../services/single-choice-answer.service';
import { UserAnswerModule } from 'src/modules/user-answer.module';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';

@Module({
  imports: [forwardRef(() => UserAnswerModule), UserQuestProgressModule],
  providers: [SingleChoiceAnswerService],
  exports: [SingleChoiceAnswerService],
})
export class SingleChoiceAnswerModule {}
