import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PlotNodeRepository } from 'src/database/plot-node.repository';
import { QuestTaskService } from './quest-task.service';
import { CreatePlotNodeDto } from 'src/dto/create.plot-node.dto';
import { PlotNode, QuestTaskType } from '@prisma/client';
import { MediaService } from './media.service';
import { UpdatePlotNodeDto } from 'src/dto/update.plot-node.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlotNodeService {
  constructor(
    private readonly plotNodeRepository: PlotNodeRepository,
    @Inject(forwardRef(() => QuestTaskService))
    private readonly questTaskService: QuestTaskService,
    private readonly mediaService: MediaService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(id: string, dto: CreatePlotNodeDto, file?: Express.Multer.File): Promise<PlotNode> {
    const task = await this.questTaskService.findTaskById(id);
    if (file) {
      await this.mediaService.uploadMedia(file, {'optionId': id})
    }
    if (task.type == QuestTaskType.INTERACTIVE_PLOT) {
      return await this.plotNodeRepository.create(id, dto);
    }
    else {
      throw new BadRequestException('Task type doesn`t support options');
    }
  }

  async getPlotNodeById(id: string): Promise<PlotNode> {
    const node =  await this.plotNodeRepository.getById(id);
    if (!node) {
        throw new NotFoundException('Node not found');
    }
    return node;
  }

  async getPlotNodesByTaskId(id: string): Promise<PlotNode[]> {
    await this.questTaskService.findTaskById(id);
    return await this.plotNodeRepository.getByTask(id);
  }

  async clearNodes(taskId: string): Promise<void> {
    this.eventEmitter.emit('task.structure-updated', { taskId });
    return this.plotNodeRepository.clearNodes(taskId);
  }

  async update(id: string, dto: UpdatePlotNodeDto, file?: Express.Multer.File): Promise<PlotNode> {
    if (file) {
      await this.mediaService.uploadMedia(file, {'optionId': id})
    }
    return this.plotNodeRepository.update(id, dto);
  }

  async delete(id: string): Promise<PlotNode> {
    return this.plotNodeRepository.delete(id);
  }
}
