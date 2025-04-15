import { forwardRef, Module } from '@nestjs/common';
import { OptionController } from '../controllers/option.controller';
import { OptionService } from '../services/option.service';
import { OptionRepository } from 'src/database/option.repository';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { MediaModule } from 'src/modules/media.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestTaskService } from 'src/services/quest-task.service';
import { MediaService } from 'src/services/media.service';
import { QuestTaskRepository } from 'src/database/task.repository';

@Module({
  imports: [PrismaModule, forwardRef(() => QuestTaskModule), MediaModule],
  controllers: [OptionController],
  providers: [OptionService, OptionRepository],
  exports: [OptionService, OptionRepository],
})
export class OptionModule {}
