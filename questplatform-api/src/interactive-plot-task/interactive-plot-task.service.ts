// import { Injectable } from '@nestjs/common';
// import { QuestTask } from '@prisma/client';
// import { QuestTaskService } from 'src/quest-task/quest-task.service';
// import { IQuestServiceTask } from 'utils/interfaces/quest-service-task.interface';

// @Injectable()
// export class InteractivePlotTaskService implements IQuestServiceTask {
//   constructor(
//     private taskService: QuestTaskService,
//     private mediaService: MediaService,
//     private coordinateService: CoordinateService,
//   ) {}

//   async saveTask(taskId: string): Promise<QuestTask> {
//     const media = await this.mediaService.findMediaFile('taskId', taskId);
//     const coordinate = await this.coordinateService.getCoordinateByTask(taskId);
//     if (
//         media.type !== 'IMAGE' ||
//         media.width == null || media.height == null
//     ) {
//         throw new BadRequestException('Invalid media type or incorrect dimensions');
//     }
//     if (
//         coordinate.positionX < 0 || coordinate.positionY < 0 || 
//         coordinate.positionX >= media.width || coordinate.positionY >= media.height ||
//         coordinate.radius >= 0
//     ) {
//         throw new BadRequestException('Coordinate is out of bounds or negative');
//     }
//     return await this.taskService.saveTask(taskId);
//   }
// }

