import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { QuestTask } from '@prisma/client';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway(
    3002, 
    {
    cors: {
      origin: '*',
    },
  })
export class QuestRunGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private readonly logger = new Logger(QuestRunGateway.name);
  
  sendQuestStarted(runId: string) {
    this.logger.log(`Run started: ${runId}`);
    this.server.to(runId).emit('quest_started', {
      runId
    })
  }

  sendTaskUpdate(runId: string, task: QuestTask) {
    this.logger.log(`New task: ${runId}: ${task.id}`);
    this.server.to(runId).emit('task_update', {
      runId,
      task,
    });
  }
  
  sendQuestCompleted(runId: string) {
    this.logger.log(`Quest completed: ${runId}`);
    this.server.to(runId).emit('quest_completed', { runId });
  }

  sendUserAnswered(runId: string, taskId: string, userId: string) {
    this.logger.log(`User answered: ${runId} ${taskId} ${userId}`);
    this.server.to(runId).emit('user_answered', { runId, taskId, userId });
  }
  
  sendUserJoined(runId: string, userId: string) {
    this.logger.log(`User joined: ${runId}: ${userId}`);
    this.server.to(runId).emit('user_joined', { userId });
  }
  
  sendToUser(userSocketId: string, event: string, payload: any) {
    this.server.to(userSocketId).emit(event, payload);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}