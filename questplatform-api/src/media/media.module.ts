import { Module, Provider } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from 'src/database/media.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryProvider } from './cloudinary.provider';
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
  exports: [MediaService],
})
export class MediaModule {}
