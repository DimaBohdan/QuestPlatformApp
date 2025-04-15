import { Module } from '@nestjs/common';
import { TextFieldTaskService } from '../services/text-field-task.service';
import { TextFieldTaskController } from '../controllers/text-field-task.controller';
import { QuestTaskModule } from 'src/modules/quest-task.module';

@Module({
  imports: [QuestTaskModule],
  providers: [TextFieldTaskService],
  controllers: [TextFieldTaskController],
  exports: [TextFieldTaskService]
})
export class TextFieldTaskModule {}
