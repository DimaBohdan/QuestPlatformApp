// import { Injectable } from '@nestjs/common';
// import { PlotNodeRepository } from 'src/database/plot-node.repository';
// import { QuestTaskService } from 'src/quest-task/quest-task.service';
// import { CreatePlotNodeDto } from './dto/create.plot-node.dto';

// @Injectable()
// export class PlotNodeService {
//   constructor(
//     private readonly plotNodeRepository: PlotNodeRepository,
//     private readonly questTaskService: QuestTaskService,
//   ) {}

//   async createOption(id: string, dto: CreatePlotNodeDto, file?: Express.Multer.File): Promise<Option> {
//     const task = await this.questTaskService.findTaskById(id);
//     if (file) {
//       await this.mediaService.uploadImage(file, {'optionId': id})
//     }
//     if (task.type == 'SINGLE_CHOICE' || task.type == 'MULTIPLE_CHOICE') {
//       return await this.optionRepository.createOption(id, dto);
//     }
//     else {
//       throw new BadRequestException('Task type doesn`t support options');
//     }
//   }

//   async getOptionById(id: string): Promise<Option> {
//     const option =  await this.optionRepository.getOptionById(id);
//     if (!option) {
//         throw new NotFoundException('Option not found');
//     }
//     return option;
//   }

//   async getCorrectAnswers(taskId: string): Promise<Option[]> {
//     return await this.optionRepository.getCorrectAnswers(taskId);
//   }

//   async getOptionsByTaskId(id: string): Promise<Option[]> {
//     await this.questTaskService.findTaskById(id);
//     return await this.optionRepository.getOptionsByTask(id);
//   }

//   async updateOption(id: string, dto: UpdateOptionDto, file?: Express.Multer.File): Promise<Option> {
//     if (file) {
//       await this.mediaService.uploadImage(file, {'optionId': id})
//     }
//     return this.optionRepository.updateOption(id, dto);
//   }

//   async clearOptions(taskId: string): Promise<void> {
//     return this.optionRepository.clearOptions(taskId);
//   }

//   async deleteOption(id: string): Promise<Option> {
//     return this.optionRepository.deleteOption(id);
//   }
// }
