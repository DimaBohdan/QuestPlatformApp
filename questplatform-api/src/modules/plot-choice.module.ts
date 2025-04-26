import { Module } from '@nestjs/common';
import { QuestTaskModule } from './quest-task.module';
import { PlotChoiceService } from 'src/services/plot-choice.service';
import { PlotChoiceRepository } from 'src/database/plot-choice.repository';
import { PlotChoiceController } from 'src/controllers/plot-choice.controller';
import { PlotNodeModule } from './plot-node.module';
import { MediaModule } from './media.module';


@Module({
  imports: [QuestTaskModule, PlotNodeModule, MediaModule],
  providers: [PlotChoiceService, PlotChoiceRepository],
  controllers: [PlotChoiceController]
})
export class PlotChoiceModule {}
