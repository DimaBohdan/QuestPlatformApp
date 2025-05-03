import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserQuestProgressService } from '../services/user-quest-progress.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';

@Controller('user-quest-progress')
@UseGuards(JwtAuthGuard)
export class UserQuestProgressController {
  constructor(private readonly userQuestProgressService: UserQuestProgressService) {}

  @Post('join/multiplayer/:code')
  joinMultiplayer(@Param('code') code: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.userQuestProgressService.joinMultiplayer(code, userId);
  }
}

