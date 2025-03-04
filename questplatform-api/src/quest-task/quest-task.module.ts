import { Module } from '@nestjs/common';
import { QuestTaskController } from './quest-task.controller';
import { QuestTaskService } from './quest-task.service';
import { QuestTaskRepository } from 'src/database/task.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QuestTaskController],
  providers: [QuestTaskService, QuestTaskRepository],
  exports: [QuestTaskService, QuestTaskRepository],
})
export class QuestTaskModule {}
