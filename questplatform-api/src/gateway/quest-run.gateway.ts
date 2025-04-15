import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { QuestTask } from '@prisma/client';
  import { Server } from 'socket.io';
  
  @WebSocketGateway(
    3002, 
    {
    cors: {
      origin: '*',
    },
  })
export class QuestRunGateway {
  @WebSocketServer()
  server: Server;
  
  sendQuestStarted(runId: string) {
    this.server.to(runId).emit('quest_started', {
      runId
    })
  }

  sendTaskUpdate(runId: string, task: QuestTask) {
    this.server.to(runId).emit('task_update', {
      runId,
      task,
    });
  }
  
  sendQuestCompleted(runId: string) {
    this.server.to(runId).emit('quest_completed', { runId });
  }
  
  sendUserJoined(runId: string, userId: string) {
    this.server.to(runId).emit('user_joined', { userId });
  }
  
  sendToUser(userSocketId: string, event: string, payload: any) {
    this.server.to(userSocketId).emit(event, payload);
  }
}
  