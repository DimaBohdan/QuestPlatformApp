import { Module } from '@nestjs/common';
import { MultipleChoiceTaskController } from '../controllers/multiple-choice-task.controller';
import { MultipleChoiceTaskService } from '../services/multiple-choice-task.service';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { OptionModule } from 'src/modules/option.module';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';

@Module({
  imports: [QuestTaskModule, OptionModule, JwtModule, PermissionModule, QuestModule],
  controllers: [MultipleChoiceTaskController],
  providers: [MultipleChoiceTaskService]
})
export class MultipleChoiceTaskModule {}
