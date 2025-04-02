import { Module } from '@nestjs/common';
import { MultipleChoiceTaskController } from './multiple-choice-task.controller';
import { MultipleChoiceTaskService } from './multiple-choice-task.service';

@Module({
  controllers: [MultipleChoiceTaskController],
  providers: [MultipleChoiceTaskService]
})
export class MultipleChoiceTaskModule {}
