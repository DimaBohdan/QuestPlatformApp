import { Module } from '@nestjs/common';
import { QuestReviewService } from '../services/quest-review.service';
import { QuestReviewController } from '../controllers/quest-review.controller';
import { QuestModule } from './quest.module';
import { QuestReviewRepository } from 'src/database/quest-review.repository';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [JwtModule, AuthModule, QuestModule, PermissionModule],
  providers: [QuestReviewService, QuestReviewRepository],
  controllers: [QuestReviewController],
  exports: [QuestReviewService, QuestReviewRepository],
})
export class QuestReviewModule {}
