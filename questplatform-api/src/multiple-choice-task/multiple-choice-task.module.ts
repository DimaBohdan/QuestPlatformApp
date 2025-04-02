import { Module } from '@nestjs/common';
import { MultipleChoiceTaskController } from './multiple-choice-task.controller';
import { MultipleChoiceTaskService } from './multiple-choice-task.service';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { OptionModule } from 'src/option/option.module';

@Module({
  imports: [QuestTaskModule, OptionModule],
  controllers: [MultipleChoiceTaskController],
  providers: [MultipleChoiceTaskService]
})
export class MultipleChoiceTaskModule {}
