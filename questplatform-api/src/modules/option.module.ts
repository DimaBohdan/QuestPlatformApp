import { forwardRef, Module } from '@nestjs/common';
import { OptionController } from '../controllers/option.controller';
import { OptionService } from '../services/option.service';
import { OptionRepository } from 'src/database/option.repository';
import { QuestTaskModule } from 'src/modules/quest-task.module';
import { MediaModule } from 'src/modules/media.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [PrismaModule, AuthModule, forwardRef(() => QuestTaskModule), MediaModule, JwtModule, PermissionModule, forwardRef(() => QuestModule)],
  controllers: [OptionController],
  providers: [OptionService, OptionRepository],
  exports: [OptionService, OptionRepository],
})
export class OptionModule {}
