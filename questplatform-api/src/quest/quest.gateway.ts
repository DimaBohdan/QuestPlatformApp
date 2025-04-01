import { Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserAnswerDTO } from 'src/user-answer/dto/answer.dto';

@ApiTags('QuestGateway')
@WebSocketGateway(3001, { cors: { origin: '*' } })
export class QuestGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(QuestGateway.name);
  private answerHandler: (userId: string, taskId: string, answer: UserAnswerDTO) => void = () => {};

  sendTask(userId: string, questId: string, task: any) {
    this.logger.log(`Sending new task to user ${userId}`);
    this.server.to(userId).emit('newTask', { questId, task });
  }

  sendQuestCompleted(userId: string, questId: string) {
    this.logger.log(`Quest completed for user ${userId}`);
    this.server.to(userId).emit('questCompleted', { questId, message: 'Quest completed!' });
  }

  @SubscribeMessage('submitAnswer')
  handleAnswer(@MessageBody() data: { userId: string; taskId: string; answer: UserAnswerDTO }) {
    this.logger.log(`Received answer from user ${data.userId} for task ${data.taskId}`);
    this.answerHandler(data.userId, data.taskId, data.answer);
  }

  onAnswerReceived(callback: (userId: string, taskId: string, answer: UserAnswerDTO) => void) {
    this.logger.log('Setting answer handler.');
    this.answerHandler = callback;
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
