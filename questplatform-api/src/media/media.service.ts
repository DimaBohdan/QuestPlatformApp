import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { MediaFile, MediaFileType } from "@prisma/client";
import { MediaRepository } from "src/database/media.repository";
import { CreateMediaRequest } from "./dto/create.media.request";
import { Transform } from "stream";

@Injectable()
export class MediaService {
  constructor(
    private mediaRepository: MediaRepository,
    @Inject('Cloudinary') private readonly cloudinaryInstance: typeof cloudinary,
  ) {}

  async findMediaFile(entityKey: string, entityId: string): Promise<MediaFile> {
    const file = await this.mediaRepository.findExistingMedia(entityKey, entityId);
    if (!file) {
      throw new NotFoundException(`File not found`);
    }
    return file;
  }

  async uploadImage(file: Express.Multer.File, data: CreateMediaRequest): Promise<MediaFile> {
    if (!file) throw new BadRequestException('File must be provided');

    const assignedEntities = Object.entries({
      questId: data.questId,
      taskId: data.taskId,
      optionId: data.optionId,
    }).filter(([key, value]) => value !== undefined);
  
    if (assignedEntities.length !== 1) {
      throw new BadRequestException('A media file must belong to exactly one entity: quest, task, or option.');
    }

    const [entityKey, entityId] = assignedEntities[0];
    const existingMedia = await this.mediaRepository.findExistingMedia(entityKey, entityId!);
    if (existingMedia) {
      await this.deleteExistingMedia(existingMedia);
    }

    const uploadResult = await this.uploadToCloudinary(file);
    return await this.saveNewMedia(uploadResult, entityKey, entityId!);
  }

  private async uploadToCloudinary(file: Express.Multer.File){
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinaryInstance.uploader.upload_stream(
        { folder: 'media' },
        (error, result) => {
          if (error) return reject(new BadRequestException('Failed to upload to Cloudinary'));
          resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });
  }

  private async deleteExistingMedia(media: MediaFile) {
    console.log(media.public_id);
    await this.cloudinaryInstance.uploader.destroy(media.public_id!);
    await this.mediaRepository.delete(media.id);
  }

  private async saveNewMedia(uploadResult: any, entityKey: string, entityId: string) {
    const mediaData = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      type: MediaFileType.IMAGE,
      width: uploadResult.width,
      height: uploadResult.height,
      [entityKey]: entityId,
    };
    return await this.mediaRepository.create(mediaData);
  }

  async deleteMediaByEntity(entityKey: 'questId' | 'taskId' | 'optionId', entityId: string): Promise<void> {
    const media = await this.mediaRepository.findExistingMedia(entityKey, entityId);
    if (!media) {
      throw new NotFoundException(`Media file for ${entityKey} with ID ${entityId} not found`);
    }
      await this.cloudinaryInstance.uploader.destroy(media.public_id!);
    await this.mediaRepository.delete(media.id);
  }  
}