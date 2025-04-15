import { Module } from '@nestjs/common';
import { FindOnMapTaskController } from '../controllers/find-on-map-task.controller';
import { FindOnMapTaskService } from '../services/find-on-map-task.service';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { CoordinateModule } from 'src/modules/coordinate.module';

@Module({
  imports: [QuestTaskModule, CoordinateModule],
  controllers: [FindOnMapTaskController],
  providers: [FindOnMapTaskService]
})
export class FindOnMapTaskModule {}
