import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Friendship } from '@prisma/client';
import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway(
    3003, 
    {
    cors: {
      origin: '*',
    },
  })
export class FriendshipGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private readonly logger = new Logger(FriendshipGateway.name);
  
  sendFriendshipRequest(friendship: Friendship) {
    this.logger.log(`Friendship sent: ${friendship}`);
    this.server.to(friendship.receiverId).emit('friendship_sent', {
      friendship
    })
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}