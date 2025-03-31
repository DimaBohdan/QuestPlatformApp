import { Module } from '@nestjs/common';
import { SingleChoiceTaskService } from './single-choice-task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { OptionModule } from 'src/option/option.module';
import { SingleChoiceTaskController } from './single-choice-task.controller';

@Module({
  imports: [PrismaModule, QuestTaskModule, OptionModule],
  providers: [SingleChoiceTaskService],
  exports: [SingleChoiceTaskService],
  controllers: [SingleChoiceTaskController],
})
export class SingleChoiceTaskModule {}
