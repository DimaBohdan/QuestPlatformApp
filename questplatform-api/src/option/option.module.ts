import { forwardRef, Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { OptionRepository } from 'src/database/option.repository';
import { QuestTaskModule } from 'src/quest-task/quest-task.module';
import { MediaModule } from 'src/media/media.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestTaskService } from 'src/quest-task/quest-task.service';
import { MediaService } from 'src/media/media.service';
import { QuestTaskRepository } from 'src/database/task.repository';

@Module({
  imports: [PrismaModule, forwardRef(() => QuestTaskModule), MediaModule],
  controllers: [OptionController],
  providers: [OptionService, OptionRepository],
  exports: [OptionService, OptionRepository],
})
export class OptionModule {}
