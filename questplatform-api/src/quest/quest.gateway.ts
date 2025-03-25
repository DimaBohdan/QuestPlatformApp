import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class QuestGateway {
  @WebSocketServer()
  server: Server;

  private answerHandler: (userId: string, taskId: string, answer: string) => void = () => {};

  sendTask(userId: string, questId: string, task: any) {
    this.server.to(userId).emit('newTask', { questId, task });
  }

  sendQuestCompleted(userId: string, questId: string) {
    this.server.to(userId).emit('questCompleted', { questId, message: 'Quest completed!' });
  }

  @SubscribeMessage('submitAnswer')
  handleAnswer(@MessageBody() data: { userId: string; taskId: string; answer: string }) {
    this.answerHandler(data.userId, data.taskId, data.answer);
  }

  onAnswerReceived(callback: (userId: string, taskId: string, answer: string) => void) {
    this.answerHandler = callback;
  }
}
