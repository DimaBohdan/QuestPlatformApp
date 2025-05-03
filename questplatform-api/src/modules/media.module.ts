import { forwardRef, Module } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { MediaController } from '../controllers/media.controller';
import { MediaRepository } from 'src/database/media.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryProvider } from '../../utils/cloudinary.provider';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    JwtModule,
    AuthModule,
    PermissionModule,
    forwardRef(() => QuestModule),
  ],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository, CloudinaryProvider, PrismaService],
  exports: [MediaService, MediaRepository, CloudinaryProvider],
})
export class MediaModule {}
