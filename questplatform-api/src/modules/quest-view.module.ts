import { Module } from '@nestjs/common';
import { QuestViewController } from '../controllers/quest-view.controller';
import { QuestViewService } from '../services/quest-view.service';
import { QuestViewRepository } from 'src/database/quest-view.repository';

@Module({
  controllers: [QuestViewController],
  providers: [QuestViewService, QuestViewRepository],
  exports: [QuestViewService, QuestViewRepository]
})
export class QuestViewModule {}
