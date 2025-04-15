import { forwardRef, Module } from '@nestjs/common';
import { TaskTimerService } from '../services/task-timer.service';
import { QuestRunModule } from 'src/modules/quest-run.module';

@Module({
  imports: [forwardRef(() => QuestRunModule)],
  providers: [TaskTimerService],
  exports: [TaskTimerService]
})
export class TaskTimerModule {}
