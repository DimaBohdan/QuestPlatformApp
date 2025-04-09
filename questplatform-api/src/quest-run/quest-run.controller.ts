import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { QuestRunService } from './quest-run.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';

@Controller('quest-run')
export class QuestRunController {
  constructor(private readonly questRunService: QuestRunService) {}

  @Post('start/:runId/single')
  startSinglePlayer(@Param('runId') runId: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.questRunService.startSinglePlayer(runId, userId);
  }

  @Post('start/:runId/multiplayer')
  startMultiplayer(@Param('runId') runId: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.questRunService.startMultiplayer(runId, userId);
  }

  @Post('launch/:runId')
  launchRun(@Param('runId') runId: string, @Req() req: RequestWithUser) {
    return this.questRunService.launchRun(runId);
  }

  @Get('by-code/:code')
  getByCode(@Param('code') code: string) {
    return this.questRunService.findBySessionCode(code);
  }
}

