import { forwardRef, Module } from '@nestjs/common';
import { MultipleChoiceAnswerService } from '../services/multiple-choice-answer.service';
import { UserAnswerModule } from 'src/modules/user-answer.module';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';
import { OptionModule } from 'src/modules/option.module';

@Module({
  imports: [forwardRef(() => UserAnswerModule), UserQuestProgressModule, OptionModule],
  providers: [MultipleChoiceAnswerService],
  exports: [MultipleChoiceAnswerService],
})
export class MultipleChoiceAnswerModule {}
