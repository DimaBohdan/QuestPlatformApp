import { Injectable } from '@nestjs/common';
import { MediaFile } from '@prisma/client';
import { CreateMediaDto } from 'src/media/dto/create.media.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediaRepository {
  constructor(private prisma: PrismaService) {}

  async findExistingMedia(entityKey: string, entityId: string): Promise<MediaFile | null> {
    return this.prisma.mediaFile.findFirst({
      where: {
        [entityKey]: entityId,
      },
    });
  }  

  async create(mediaData: CreateMediaDto): Promise<MediaFile> {
    return this.prisma.mediaFile.create({ data: mediaData })
  }

  async delete(id: string): Promise<MediaFile> {
    return this.prisma.mediaFile.delete({ where: { id } });
  }
}