import { forwardRef, Module } from '@nestjs/common';
import { UserQuestProgressController } from '../controllers/user-quest-progress.controller';
import { UserQuestProgressService } from '../services/user-quest-progress.service';
import { UserQuestProgressRepository } from 'src/database/user-quest-progress.repository';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { QuestRunModule } from 'src/modules/quest-run.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';
import { QuestModule } from './quest.module';
import { PermissionModule } from './permission.module';

@Module({
  imports: [forwardRef(() => QuestTaskModule), forwardRef(() => QuestRunModule), JwtModule, AuthModule, forwardRef(() => QuestModule), PermissionModule],
  controllers: [UserQuestProgressController],
  providers: [UserQuestProgressService, UserQuestProgressRepository],
  exports: [UserQuestProgressService, UserQuestProgressRepository]
})
export class UserQuestProgressModule {}
