import { Controller, Post, UseInterceptors, UploadedFile, Body, Delete, Query, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../services/media.service';
import { CreateMediaRequest } from '../dto/create.media.request';
import { ApiBody, ApiOperation, ApiQuery, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';

@ApiTags('Media')
@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create media file' })
  @ApiBody({
    description: 'Upload media file, `questId`, `taskId`, or `optionId` should be provided if necessary.',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        questId: {
          type: 'string',
          nullable: true,
          description: 'Optional questId',
        },
        taskId: {
          type: 'string',
          nullable: true,
          description: 'Optional taskId',
        },
        optionId: {
          type: 'string',
          nullable: true,
          description: 'Optional optionId',
        },
      },
      required: ['file'],
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateMediaRequest,
  ) {
    return this.mediaService.uploadMedia(file, data);
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
