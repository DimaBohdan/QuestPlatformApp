import { Module } from '@nestjs/common';
import { FindOnMapTaskController } from './find-on-map-task.controller';
import { FindOnMapTaskService } from './find-on-map-task.service';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { CoordinateModule } from 'src/coordinate/coordinate.module';

@Module({
  imports: [QuestTaskModule, CoordinateModule],
  controllers: [FindOnMapTaskController],
  providers: [FindOnMapTaskService]
})
export class FindOnMapTaskModule {}
