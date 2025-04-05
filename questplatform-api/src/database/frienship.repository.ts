import { Injectable } from "@nestjs/common";
import { Friendship, Option, Status } from "@prisma/client";
import { UpdateOptionDto } from "src/option/dto/update.option.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FriendshipRepository {
  constructor(private prisma: PrismaService) {}

  async createRequest(requesterId: string, receiverId: string): Promise<Friendship> {
    return this.prisma.friendship.create({
      data: {
        requesterId,
        receiverId,
      },
    });
  }

  async acceptRequest(requesterId: string, receiverId: string): Promise<Friendship> {
    return this.prisma.friendship.update({
      where: {
        requesterId_receiverId:
        { requesterId, receiverId }
      },
      data: {
        status: Status.APPROVED
      },
    });
  }

  async declineRequest(requesterId: string, receiverId: string): Promise<Friendship> {
    return this.prisma.friendship.update({
      where: {
        requesterId_receiverId:
        { requesterId, receiverId }
      },
      data: {
        status: Status.DECLINED
      },
    });
  }

  async getFriendsByUser(userId: string): Promise<Friendship[]> {
    return this.prisma.friendship.findMany({
      where: { 
        OR: [
          { requesterId: userId },
          { receiverId: userId },
        ],
        status: Status.APPROVED
      }
    });
  }

  async getSentFriendRequests(requesterId: string): Promise<Friendship[]> {
    return this.prisma.friendship.findMany({
      where: { requesterId, status: Status.PENDING }
    });
  }

  async getReceivedFriendRequests(receiverId: string): Promise<Friendship[]> {
    return this.prisma.friendship.findMany({
      where: { receiverId, status: Status.PENDING }
    });
  }

  async getFriendshipRequest(requesterId: string, receiverId: string): Promise<Friendship | null> {
    return this.prisma.friendship.findUnique({
      where: {
        requesterId_receiverId: { requesterId, receiverId }
      }
    });
  }

  async delete(requesterId: string, receiverId: string): Promise<Friendship> {
    return this.prisma.friendship.delete({ where:
      { requesterId_receiverId:
        {requesterId, receiverId}
      }
    });
  }
}