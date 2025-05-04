import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Friendship, Status } from '@prisma/client';
import { FriendshipRepository } from 'src/database/frienship.repository';
import { FriendshipGateway } from 'src/gateway/friendship.gateway';

@Injectable()
export class FriendshipService {
  constructor(
    private friendshipRepository: FriendshipRepository,
    private friendshipGateway: FriendshipGateway,
  ) {}

  async createRequest(requesterId: string, receiverId: string): Promise<Friendship> {
    if (requesterId === receiverId) {
      throw new BadRequestException('You cannot send a friend request to yourself.');
    }
    const existing = await this.friendshipRepository.getFriendshipRequest(requesterId, receiverId);
    if (existing) {
      throw new ConflictException('Friend request already exists or users are already friends.');
    }
    const request = await this.friendshipRepository.createRequest(requesterId, receiverId);
    this.friendshipGateway.sendFriendshipRequest(request);
    return request;
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
    const friendship = await this.getFriendshipRequest(requesterId, receiverId);
    return await this.friendshipRepository.delete(friendship.requesterId, friendship.receiverId);
  }
}
