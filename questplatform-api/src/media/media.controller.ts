import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { CreateMediaRequest } from './dto/create.media.request';
import { Public } from 'utils/decorators/public.decorator';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() data: CreateMediaRequest) {
    return this.mediaService.uploadImage(file, data);
  }

  @Public()
  @Delete()
  async deleteMediaByEntity(
    @Query('entityKey') entityKey: 'questId' | 'taskId' | 'optionId',
    @Query('entityId') entityId: string
  ) {
    return this.mediaService.deleteMediaByEntity(entityKey, entityId);
  }
  
}
