import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Delete, Query, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { CreateMediaRequest } from './dto/create.media.request';
import { Public } from 'utils/decorators/public.decorator';
import { CaslForbiddenError } from 'utils/decorators/casl-forbidden-error.decorator';
import { CaslForbiddenErrorI } from 'utils/permissions/casl-rules.factory';
import { subject } from '@casl/ability';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() data: CreateMediaRequest,
  //   @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  // ) {

  //   forbiddenError.throwUnlessCan('manage', subject('MediaFile', file));
  //   return this.mediaService.uploadImage(file, data);
  // }

  @Delete()
  async deleteMediaByEntity(
    @Query('entityKey') entityKey: 'questId' | 'taskId' | 'optionId',
    @Query('entityId') entityId: string,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  ) {
    const mediaFile = await this.mediaService.findMediaFile(entityKey, entityId);
    forbiddenError.throwUnlessCan('manage', subject('MediaFile', mediaFile));
    return this.mediaService.deleteMediaByEntity(entityKey, entityId);
  }
  
}
