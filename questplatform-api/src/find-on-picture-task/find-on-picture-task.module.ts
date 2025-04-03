import { Module } from '@nestjs/common';
import { FindOnPictureTaskService } from './find-on-picture-task.service';
import { FindOnPictureTaskController } from './find-on-picture-task.controller';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { CoordinateModule } from 'src/coordinate/coordinate.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [QuestTaskModule, CoordinateModule, MediaModule],
  providers: [FindOnPictureTaskService],
  controllers: [FindOnPictureTaskController]
})
export class FindOnPictureTaskModule {}
