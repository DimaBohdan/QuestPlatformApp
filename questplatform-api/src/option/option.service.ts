import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Option } from "@prisma/client";
import { CreateOptionDto } from "src/option/dto/create.option.dto";
import { UpdateOptionDto } from "src/option/dto/update.option.dto";
import { OptionRepository } from "src/database/option.repository";
import { QuestTaskService } from "src/quest-task/quest-task.service";
import { MediaService } from "src/media/media.service";

@Injectable()
export class OptionService {
  constructor(
    private readonly optionRepository: OptionRepository,
    private readonly questTaskService: QuestTaskService,
    private readonly mediaService: MediaService,
  ) {}

  async createOption(id: string, dto: CreateOptionDto, file?: Express.Multer.File): Promise<Option> {
    const task = await this.questTaskService.findTaskById(id);
    if (file) {
      await this.mediaService.uploadImage(file, {'optionId': id})
    }
    if (task.type == 'SINGLE_CHOICE' || task.type == 'MULTIPLE_CHOICE') {
      return await this.optionRepository.createOption(id, dto);
    }
    else {
      throw new BadRequestException('Task type doesn`t support options');
    }
  }

  async getOptionById(id: string): Promise<Option> {
    const option =  await this.getOptionById(id);
    if (!option) {
        throw new NotFoundException('Option not found');
    }
    return option;
  }

  async getCorrectAnswers(taskId: string): Promise<Option[]> {
    return await this.optionRepository.getCorrectAnswers(taskId);
  }

  async getOptionsByTaskId(id: string): Promise<Option[]> {
    await this.questTaskService.findTaskById(id);
    return await this.optionRepository.getOptionsByTask(id);
  }

  async updateOption(id: string, dto: UpdateOptionDto, file?: Express.Multer.File): Promise<Option> {
    if (file) {
      await this.mediaService.uploadImage(file, {'optionId': id})
    }
    return this.optionRepository.updateOption(id, dto);
  }

  async deleteOption(id: string): Promise<Option> {
    return this.optionRepository.deleteOption(id);
  }
}
