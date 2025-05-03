import { Module } from '@nestjs/common';
import { FriendshipController } from '../controllers/friendship.controller';
import { FriendshipService } from '../services/friendship.service';
import { FriendshipRepository } from 'src/database/frienship.repository';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission.module';
import { QuestModule } from './quest.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [JwtModule, AuthModule, PermissionModule, QuestModule],
  controllers: [FriendshipController],
  providers: [FriendshipService, FriendshipRepository],
})
export class FriendshipModule {}
