import { Module, Provider } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { MediaController } from '../controllers/media.controller';
import { MediaRepository } from 'src/database/media.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryProvider } from '../../utils/cloudinary.provider';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({

  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository, CloudinaryProvider, PrismaService],
  exports: [MediaService, MediaRepository, CloudinaryProvider],
})
export class MediaModule {}
