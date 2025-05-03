import { forwardRef, Module } from '@nestjs/common';
import { QuestTaskModule } from './quest-task.module';
import { PlotChoiceService } from 'src/services/plot-choice.service';
import { PlotChoiceRepository } from 'src/database/plot-choice.repository';
import { PlotChoiceController } from 'src/controllers/plot-choice.controller';
import { PlotNodeModule } from './plot-node.module';
import { MediaModule } from './media.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';
import { QuestModule } from './quest.module';
import { PermissionModule } from './permission.module';


@Module({
  imports: [JwtModule, AuthModule, QuestModule, PermissionModule, QuestTaskModule, PlotNodeModule, MediaModule],
  providers: [PlotChoiceService, PlotChoiceRepository],
  controllers: [PlotChoiceController]
})
export class PlotChoiceModule {}
