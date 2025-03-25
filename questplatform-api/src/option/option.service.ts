import { Injectable, NotFoundException } from "@nestjs/common";
import { Option } from "@prisma/client";
import { CreateOptionDto } from "src/option/dto/create.option.dto";
import { UpdateOptionDto } from "src/option/dto/update.option.dto";
import { OptionRepository } from "src/database/option.repository";
import { QuestTaskService } from "src/quest-task/quest-task.service";

@Injectable()
export class OptionService {
  constructor(
    private readonly optionRepository: OptionRepository,
    private readonly questTaskService: QuestTaskService) {}

  async createOption(id: string, dto: CreateOptionDto): Promise<Option> {
    const task = await this.questTaskService.findTaskById(id);
    if (task.type == 'SINGLE_CHOICE') {
      return this.optionRepository.createSingleOption(id, dto);
    }
    else if (task.type == 'MULTIPLE_CHOICE') {
      return this.optionRepository.createMultipleOption(id, dto);
    }
    else {
      throw new NotFoundException('Type of task is not correct');
    }
  }

  async getOptionById(id: string): Promise<Option> {
    const option =  await this.getOptionById(id);
    if (!option) {
        throw new NotFoundException('Option not found');
    }
    return option;
  }

  async getOptionByTaskId(id: string): Promise<Option[]> {
    const task = await this.questTaskService.findTaskById(id);
    if (task.type == 'SINGLE_CHOICE') {
      return this.optionRepository.getOptionsBySingleTask(id);
    }
    else if (task.type == 'MULTIPLE_CHOICE') {
      return this.optionRepository.getOptionsByMultipleTask(id);
    }
    else {
      throw new NotFoundException('Type of task is not correct');
    }
  }

  async updateOption(id: string, dto: UpdateOptionDto): Promise<Option> {
    return this.optionRepository.updateOption(id, dto);
  }

  async deleteOption(id: string): Promise<Option> {
    return this.optionRepository.deleteOption(id);
  }
}

