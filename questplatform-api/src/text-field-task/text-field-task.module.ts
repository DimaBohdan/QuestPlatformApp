import { Module } from '@nestjs/common';
import { TextFieldTaskService } from './text-field-task.service';
import { TextFieldTaskController } from './text-field-task.controller';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';

@Module({
  imports: [QuestTaskModule],
  providers: [TextFieldTaskService],
  controllers: [TextFieldTaskController],
  exports: [TextFieldTaskService]
})
export class TextFieldTaskModule {}
