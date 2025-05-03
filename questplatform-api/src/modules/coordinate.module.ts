import { forwardRef, Module } from '@nestjs/common';
import { CoordinateController } from '../controllers/coordinate.controller';
import { CoordinateService } from '../services/coordinate.service';
import { CoordinateRepository } from 'src/database/coordinate.repository';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';
import { OptionModule } from './option.module';
import { QuestTaskModule } from './quest-task.module';

@Module({
  imports: [JwtModule, PermissionModule, forwardRef(() => QuestModule), forwardRef(() => QuestTaskModule)],
  controllers: [CoordinateController],
  providers: [CoordinateService, CoordinateRepository],
  exports: [CoordinateService, CoordinateRepository]
})
export class CoordinateModule {}
