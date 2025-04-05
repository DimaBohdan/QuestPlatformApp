// import { Body, Controller, Param, Patch, Post, UploadedFile } from '@nestjs/common';
// import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
// import { QuestTask } from '@prisma/client';
// import { QuestionTaskDTO } from 'src/quest-task/dto/question.task.dto';
// import { QuestTaskService } from 'src/quest-task/quest-task.service';
// import { IQuestControllerTask } from 'utils/interfaces/quest-controller-task.interface';
// import { InteractivePlotTaskService } from './interactive-plot-task.service';

// @ApiTags('Interactive Plot Task')
// @Controller('interactive-plot-task')
// export class FindOnPictureTaskController implements IQuestControllerTask {
//   constructor(
//     private readonly taskService: QuestTaskService,
//     private readonly interactivePlotTaskService: InteractivePlotTaskService) {}

//   @Post(':questId')
//   @ApiOperation({ summary: 'Create new interactive plot task' })
//   @ApiParam({ name: 'questId', description: 'Quest ID' })
//   @ApiBody({ type: QuestionTaskDTO })  
//   async createTask(
//     @Param('questId') questId: string,
//     @Body() question: QuestionTaskDTO,
//     @UploadedFile() file?: Express.Multer.File,
//   ): Promise<QuestTask> {
//     return this.taskService.createTask(questId, { ...question, type:'INTERACTIVE_PLOT', }, file);
//   }

//   @Patch('save/:taskId')
//   @ApiOperation({ summary: 'Save new interactive plot task' })
//   @ApiParam({ name: 'taskId', description: 'Task ID' })
//   async saveTask(
//     @Param('taskId') taskId: string,
//   ): Promise<QuestTask> {
//     return this.interactivePlotTaskService.saveTask(taskId);
//   }
// }