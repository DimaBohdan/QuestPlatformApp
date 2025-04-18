import { Module } from '@nestjs/common';
import { QuestReviewService } from '../services/quest-review.service';
import { QuestReviewController } from '../controllers/quest-review.controller';
import { QuestModule } from './quest.module';
import { QuestReviewRepository } from 'src/database/quest-review.repository';

@Module({
  imports: [QuestModule],
  providers: [QuestReviewService, QuestReviewRepository],
  controllers: [QuestReviewController],
  exports: [QuestReviewService, QuestReviewRepository],
})
export class QuestReviewModule {}
