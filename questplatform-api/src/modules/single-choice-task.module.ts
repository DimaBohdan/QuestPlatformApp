import { Module } from '@nestjs/common';
import { SingleChoiceTaskService } from '../services/single-choice-task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { OptionModule } from 'src/modules/option.module';
import { SingleChoiceTaskController } from '../controllers/single-choice-task.controller';

@Module({
  imports: [PrismaModule, QuestTaskModule, OptionModule],
  providers: [SingleChoiceTaskService],
  exports: [SingleChoiceTaskService],
  controllers: [SingleChoiceTaskController],
})
export class SingleChoiceTaskModule {}
