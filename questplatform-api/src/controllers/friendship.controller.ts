import { Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { FriendshipService } from '../services/friendship.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { Friendship } from '@prisma/client';

@ApiTags('Friendship')
@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('userId')
  @ApiOperation({ summary: 'Create a new friendship request' })
  async createQuest(
    @Req() req: RequestWithUser,
    @Param('userId') receiverId: string,
  ): Promise<Friendship>  {
    return this.friendshipService.createRequest(req.user.id, receiverId);
  }

  @Patch('accept/:userId')
  @ApiOperation({ summary: 'Accept pending request' })
  @ApiParam({ name: 'userId', description: 'userId' })
  async acceptRequest(
    @Param('userId') id: string,
    @Req() req: RequestWithUser,
  ): Promise<Friendship>  {
    return this.friendshipService.acceptRequest(id, req.user.id);
  }

  @Patch('decline/:userId')
  @ApiOperation({ summary: 'Decline pending request' })
  @ApiParam({ name: 'userId', description: 'userId' })
  async declineRequest(
    @Param('userId') id: string,
    @Req() req: RequestWithUser,
    ): Promise<Friendship> {
      return this.friendshipService.declineRequest(id, req.user.id);
  }

  @Get('friends/:userId')
  @ApiOperation({ summary: 'Get friends by userId' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  getFriendsByUser(@Param('userId') id: string) {
    return this.friendshipService.getFriendsByUser(id);
  }

  @Get('sent')
  @ApiOperation({ summary: 'Get sent friends requests' })
  getSentFriendRequests(@Req() id: string) {
    return this.friendshipService.getSentFriendRequests(id);
  }

  @Get('received')
  @ApiOperation({ summary: 'Get received friends requests' })
  getReceivedFriendRequests(@Req() id: string) {
    return this.friendshipService.getReceivedFriendRequests(id);
  }

  @Get('request/:id')
  @ApiOperation({ summary: 'Get friendship request' })
  @ApiParam({ name: 'id', description: 'User ID' })
  getFriendshipRequest(
    @Param('id') id: string, 
    @Req() req: RequestWithUser,
  ) {
    return this.friendshipService.getFriendshipRequest(req.user.id, id);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete friendship request by id' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  deleteOption(
    @Param('userId') id: string,
    @Req() req: RequestWithUser,
  ) {
    return this.friendshipService.delete(req.user.id, id);
  }
}
