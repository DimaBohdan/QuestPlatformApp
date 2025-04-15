import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { QuestRunService } from '../services/quest-run.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { CaslForbiddenError } from 'utils/decorators/casl-forbidden-error.decorator';
import { CaslForbiddenErrorI } from 'utils/permissions/casl-rules.factory';
import { subject } from '@casl/ability';

@Controller('quest-run')
export class QuestRunController {
  constructor(private readonly questRunService: QuestRunService) {}

  @Post('start/:runId/single')
  async startSinglePlayer(@Param('runId') runId: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.questRunService.startSinglePlayer(runId, userId);
  }

  @Post('start/:runId/multiplayer')
  async startMultiplayer(@Param('runId') runId: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.questRunService.startMultiplayer(runId, userId);
  }

  @Post('launch/:runId')
  async launchRun(
    @Param('runId') runId: string, 
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  ) {
    const run = await this.questRunService.getQuestRunById(runId);
    forbiddenError.throwUnlessCan('manage', subject('QuestRun', run));
    return this.questRunService.launchRun(runId);
  }

  @Get('by-code/:code')
  async getByCode(@Param('code') code: string) {
    return this.questRunService.findBySessionCode(code);
  }
}
