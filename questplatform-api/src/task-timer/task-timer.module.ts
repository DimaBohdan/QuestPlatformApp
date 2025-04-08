import { Module } from '@nestjs/common';
import { TaskTimerService } from './task-timer.service';

@Module({
  providers: [TaskTimerService],
  exports: [TaskTimerService]
})
export class TaskTimerModule {}
