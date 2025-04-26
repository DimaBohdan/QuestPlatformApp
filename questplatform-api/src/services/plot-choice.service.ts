import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PlotChoice, QuestTaskType } from "@prisma/client";
import { QuestTaskService } from "src/services/quest-task.service";
import { MediaService } from "src/services/media.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreatePlotChoiceDto } from "src/dto/create.plot-choice.dto";
import { PlotChoiceRepository } from "src/database/plot-choice.repository";
import { PlotNodeService } from "./plot-node.service";
import { UpdatePlotChoiceDto } from "src/dto/update.plot-choice.dto";

@Injectable()
export class PlotChoiceService {
  constructor(
    private readonly plotChoiceRepository: PlotChoiceRepository,
    private readonly plotNodeService: PlotNodeService,
    private readonly questTaskService: QuestTaskService,
    private readonly mediaService: MediaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(id: string, dto: CreatePlotChoiceDto): Promise<PlotChoice> {
    const task = await this.questTaskService.findTaskById(id);
    if (task.type == QuestTaskType.INTERACTIVE_PLOT) {
      const choice = await this.plotChoiceRepository.create(id, dto);
      const node = await this.plotNodeService.getPlotNodeById(choice.nodeId);
      this.eventEmitter.emit('task.structure-updated', { taskId: node.taskId });
      return choice;
    }
    else {
      throw new BadRequestException('Task type doesn`t support options');
    }
  }

  async getChoiceById(id: string): Promise<PlotChoice> {
    const option =  await this.plotChoiceRepository.getChoiceById(id);
    if (!option) {
        throw new NotFoundException('Option not found');
    }
    return option;
  }

  async getChoicesByNode(taskId: string): Promise<PlotChoice[]> {
    await this.questTaskService.findTaskById(taskId);
    return await this.plotChoiceRepository.getChoicesByNode(taskId);
  }

  async update(id: string, dto: UpdatePlotChoiceDto, file?: Express.Multer.File): Promise<PlotChoice> {
    if (file) {
      await this.mediaService.uploadImage(file, {'optionId': id})
    }
    const choice = await this.plotChoiceRepository.update(id, dto);
    const node = await this.plotNodeService.getPlotNodeById(choice.nodeId);
    this.eventEmitter.emit('task.structure-updated', { taskId: node.taskId });
    return choice;
  }

  async clearChoices(taskId: string): Promise<void> {
    this.eventEmitter.emit('task.structure-updated', { taskId });
    return this.plotChoiceRepository.clearChoices(taskId);
  }

  async delete(id: string): Promise<PlotChoice> {
    const choice = await this.plotChoiceRepository.delete(id);
    const node = await this.plotNodeService.getPlotNodeById(choice.nodeId);
    this.eventEmitter.emit('task.structure-updated', { taskId: node.taskId });
    return choice;
  }
}
