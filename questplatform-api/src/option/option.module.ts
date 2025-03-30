import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { OptionRepository } from 'src/database/option.repository';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [QuestTaskModule, MediaModule],
  controllers: [OptionController],
  providers: [OptionService, OptionRepository],
  exports: [OptionService, OptionRepository],
})
export class OptionModule {}
