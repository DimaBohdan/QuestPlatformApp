import { Module } from '@nestjs/common';
import { FriendshipController } from '../controllers/friendship.controller';
import { FriendshipService } from '../services/friendship.service';
import { FriendshipRepository } from 'src/database/frienship.repository';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, FriendshipRepository],
})
export class FriendshipModule {}
