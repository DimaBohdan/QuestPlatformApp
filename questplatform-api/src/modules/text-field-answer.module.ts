import { forwardRef, Module } from '@nestjs/common';
import { TextFieldAnswerService } from '../services/text-field-answer.service';
import { UserAnswerModule } from 'src/modules/user-answer.module';
import { UserQuestProgressModule } from 'src/modules/user-quest-progress.module';
import { QuestTaskModule } from 'src/modules/quest-task.module';

@Module({
  imports: [forwardRef(() => UserAnswerModule), forwardRef(() => QuestTaskModule), UserQuestProgressModule],
  providers: [TextFieldAnswerService],
  exports: [TextFieldAnswerService]
})
export class TextFieldAnswerModule {}
