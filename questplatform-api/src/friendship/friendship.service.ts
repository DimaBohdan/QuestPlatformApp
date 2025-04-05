import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Friendship, Status } from '@prisma/client';
import { FriendshipRepository } from 'src/database/frienship.repository';

@Injectable()
export class FriendshipService {
  constructor(
    private friendshipRepository: FriendshipRepository, 
  ) {}

  async createRequest(requesterId: string, receiverId: string): Promise<Friendship> {
    return await this.friendshipRepository.createRequest(requesterId, receiverId);
  }

  async acceptRequest(requesterId: string, receiverId: string): Promise<Friendship> {
    const friendship = await this.getFriendshipRequest(requesterId, receiverId);
    if (friendship.status !== Status.PENDING) {
      throw new BadRequestException('Request need to have pending state to be accepted');
    }
    return await this.friendshipRepository.acceptRequest(requesterId, receiverId);
  }

  async declineRequest(requesterId: string, receiverId: string): Promise<Friendship> {
    const friendship = await this.getFriendshipRequest(requesterId, receiverId);
    if (friendship.status !== Status.PENDING) {
      throw new BadRequestException('Request need to have pending state to be declined');
    }
    return await this.friendshipRepository.acceptRequest(requesterId, receiverId);
  }

  async getFriendsByUser(userId: string): Promise<Friendship[]> {
    return await this.friendshipRepository.getFriendsByUser(userId);
  }

  async getSentFriendRequests(userId: string): Promise<Friendship[]> {
    return await this.friendshipRepository.getSentFriendRequests(userId);
  }

  async getReceivedFriendRequests(userId: string): Promise<Friendship[]> {
    return await this.friendshipRepository.getReceivedFriendRequests(userId);
  }

  async getFriendshipRequest(requesterId: string, receiverId: string): Promise<Friendship> {
    const friendship =await this.friendshipRepository.getFriendshipRequest(requesterId, receiverId);
    if (!friendship) {
      throw new NotFoundException('Friendship not found')
    }
    return friendship;
  }

  async delete(requesterId: string, receiverId: string): Promise<Friendship> {
    return await this.friendshipRepository.delete(requesterId, receiverId);
  }
}
