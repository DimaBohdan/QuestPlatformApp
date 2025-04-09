import { Controller, Param, Post, Req } from '@nestjs/common';
import { UserQuestProgressService } from './user-quest-progress.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';

@Controller('user-quest-progress')
export class UserQuestProgressController {
  constructor(private readonly userQuestProgressService: UserQuestProgressService) {}

  @Post('join/multiplayer/:code')
  joinMultiplayer(@Param('code') code: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.userQuestProgressService.joinMultiplayer(code, userId);
  }
}

