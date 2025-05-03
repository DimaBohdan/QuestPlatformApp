import { Module } from '@nestjs/common';
import { TextFieldTaskService } from '../services/text-field-task.service';
import { TextFieldTaskController } from '../controllers/text-field-task.controller';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';

@Module({
  imports: [QuestTaskModule, JwtModule, PermissionModule, QuestModule],
  providers: [TextFieldTaskService],
  controllers: [TextFieldTaskController],
  exports: [TextFieldTaskService]
})
export class TextFieldTaskModule {}
