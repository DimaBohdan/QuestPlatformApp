import { Module } from '@nestjs/common';
import { SingleChoiceTaskService } from '../services/single-choice-task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { OptionModule } from 'src/modules/option.module';
import { SingleChoiceTaskController } from '../controllers/single-choice-task.controller';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';

@Module({
  imports: [PrismaModule, QuestTaskModule, OptionModule, JwtModule, PermissionModule, QuestModule],
  providers: [SingleChoiceTaskService],
  exports: [SingleChoiceTaskService],
  controllers: [SingleChoiceTaskController],
})
export class SingleChoiceTaskModule {}
