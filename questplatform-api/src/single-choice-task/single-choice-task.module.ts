import { Module } from '@nestjs/common';
import { SingleChoiceTaskService } from './single-choice-task.service';
// import { SingleChoiceTaskController } from './single-choice-task.controller';

@Module({
  providers: [SingleChoiceTaskService],
  // controllers: [SingleChoiceTaskController]
})
export class SingleChoiceTaskModule {}
