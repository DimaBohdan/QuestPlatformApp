import { forwardRef, Module } from '@nestjs/common';
import { PlotNodeController } from 'src/controllers/plot-node.controller';
import { PlotNodeService } from 'src/services/plot-node.service';
import { QuestTaskModule } from './quest-task.module';
import { PlotNodeRepository } from 'src/database/plot-node.repository';
import { MediaModule } from './media.module';


@Module({
  imports: [forwardRef(() => QuestTaskModule), MediaModule],
  providers: [PlotNodeService, PlotNodeRepository,],
  controllers: [PlotNodeController],
  exports: [PlotNodeService, PlotNodeRepository]
})
export class PlotNodeModule {}
