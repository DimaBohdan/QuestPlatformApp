import { forwardRef, Module } from '@nestjs/common';
import { PlotNodeController } from 'src/controllers/plot-node.controller';
import { PlotNodeService } from 'src/services/plot-node.service';
import { QuestTaskModule } from './quest-task.module';
import { PlotNodeRepository } from 'src/database/plot-node.repository';
import { MediaModule } from './media.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';
import { QuestModule } from './quest.module';
import { PermissionModule } from './permission.module';


@Module({
  imports: [JwtModule, AuthModule, forwardRef(() => QuestModule), PermissionModule, forwardRef(() => QuestTaskModule), MediaModule],
  providers: [PlotNodeService, PlotNodeRepository,],
  controllers: [PlotNodeController],
  exports: [PlotNodeService, PlotNodeRepository]
})
export class PlotNodeModule {}
