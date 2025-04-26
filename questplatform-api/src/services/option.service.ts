import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Option, QuestTaskType } from "@prisma/client";
import { CreateOptionDto } from "src/dto/create.option.dto";
import { UpdateOptionDto } from "src/dto/update.option.dto";
import { OptionRepository } from "src/database/option.repository";
import { QuestTaskService } from "src/services/quest-task.service";
import { MediaService } from "src/services/media.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class OptionService {
  constructor(
    private readonly optionRepository: OptionRepository,
    @Inject(forwardRef(() => QuestTaskService)) 
    private readonly questTaskService: QuestTaskService,
    private readonly mediaService: MediaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createOption(id: string, dto: CreateOptionDto, file?: Express.Multer.File): Promise<Option> {
    const task = await this.questTaskService.findTaskById(id);
    if (file) {
      await this.mediaService.uploadImage(file, {'optionId': id})
    }
    if (task.type == QuestTaskType.SINGLE_CHOICE || task.type == QuestTaskType.MULTIPLE_CHOICE) {
      const option = await this.optionRepository.createOption(id, dto);
      this.eventEmitter.emit('task.structure-updated', { taskId: option.taskId });
      return option;
    }
    else {
      throw new BadRequestException('Task type doesn`t support options');
    }
  }

  async getOptionById(id: string): Promise<Option> {
    const option =  await this.optionRepository.getOptionById(id);
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
    const option = await this.optionRepository.updateOption(id, dto);
    this.eventEmitter.emit('task.structure-updated', { taskId: option.taskId });
    return option;
  }

  async clearOptions(taskId: string): Promise<void> {
    this.eventEmitter.emit('task.structure-updated', { taskId });
    return this.optionRepository.clearOptions(taskId);
  }

  async deleteOption(id: string): Promise<Option> {
    const option = await this.optionRepository.deleteOption(id);
    this.eventEmitter.emit('task.structure-updated', { taskId: option.taskId });
    return option;
  }
}
