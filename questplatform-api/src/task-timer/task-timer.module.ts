import { forwardRef, Module } from '@nestjs/common';
import { TaskTimerService } from './task-timer.service';
import { QuestRunModule } from 'src/quest-run/quest-run.module';

@Module({
  imports: [forwardRef(() => QuestRunModule)],
  providers: [TaskTimerService],
  exports: [TaskTimerService]
})
export class TaskTimerModule {}
