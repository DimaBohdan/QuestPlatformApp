import { Module } from '@nestjs/common';
import { QuestViewController } from './quest-view.controller';
import { QuestViewService } from './quest-view.service';
import { QuestViewRepository } from 'src/database/quest-view.repository';

@Module({
  controllers: [QuestViewController],
  providers: [QuestViewService, QuestViewRepository],
  exports: [QuestViewService, QuestViewRepository]
})
export class QuestViewModule {}
