import { Module } from '@nestjs/common';
import { MultipleChoiceTaskController } from '../controllers/multiple-choice-task.controller';
import { MultipleChoiceTaskService } from '../services/multiple-choice-task.service';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { OptionModule } from 'src/modules/option.module';

@Module({
  imports: [QuestTaskModule, OptionModule],
  controllers: [MultipleChoiceTaskController],
  providers: [MultipleChoiceTaskService]
})
export class MultipleChoiceTaskModule {}
