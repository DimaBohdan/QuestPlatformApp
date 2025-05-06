import { Module } from '@nestjs/common';
import { FindOnPictureTaskService } from '../services/find-on-picture-task.service';
import { FindOnPictureTaskController } from '../controllers/find-on-picture-task.controller';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { CoordinateModule } from 'src/modules/coordinate.module';
import { MediaModule } from 'src/modules/media.module';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [QuestTaskModule, CoordinateModule, AuthModule, JwtModule, PermissionModule, QuestModule, MediaModule],
  providers: [FindOnPictureTaskService],
  controllers: [FindOnPictureTaskController]
})
export class FindOnPictureTaskModule {}
