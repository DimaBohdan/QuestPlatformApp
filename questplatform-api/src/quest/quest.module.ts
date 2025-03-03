import { Module } from '@nestjs/common';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';
import { QuestRepository } from 'src/database/quest.repository';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [PrismaModule, AuthModule, MediaModule],
  controllers: [QuestController],
  providers: [QuestService, QuestRepository, JwtAuthGuard],
  exports: [QuestService, QuestRepository],
})
export class QuestModule {}
