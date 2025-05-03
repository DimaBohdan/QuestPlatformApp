import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../services/media.service';
import { CreateMediaRequest } from '../dto/create.media.request';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';

@ApiTags('Media')
@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @ApiOperation({ summary: 'Create media file' })
  @ApiBody({ type: CreateMediaRequest })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateMediaRequest,
  ) {
    return this.mediaService.uploadImage(file, data);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete media file' })
  @ApiQuery({
    name: 'entityKey',
    enum: ['questId', 'taskId', 'optionId'],
    description: 'The type of entity associated with the media file',
    required: true,
  })
  @ApiQuery({
    name: 'entityId',
    type: String,
    description: 'The unique ID of the entity',
    required: true,
  })
  async deleteMediaByEntity(
    @Query('entityKey') entityKey: 'questId' | 'taskId' | 'optionId',
    @Query('entityId') entityId: string,
  ) {
    return this.mediaService.deleteMediaByEntity(entityKey, entityId);
  }
  
}
