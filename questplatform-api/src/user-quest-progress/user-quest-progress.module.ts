import { Module } from '@nestjs/common';
import { UserQuestProgressController } from './user-quest-progress.controller';
import { UserQuestProgressService } from './user-quest-progress.service';

@Module({
  controllers: [UserQuestProgressController],
  providers: [UserQuestProgressService],
})
export class UserQuestProgressModule {}
