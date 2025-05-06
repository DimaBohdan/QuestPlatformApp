import { Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { QuestRunService } from '../services/quest-run.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { Public } from 'utils/decorators/public.decorator';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { QuestRunOwnershipGuard } from 'utils/guards/run.ownership.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';

@ApiTags('Quest Run')
@Controller('quest-run')
@UseGuards(JwtAuthGuard)
export class QuestRunController {
  constructor(private readonly questRunService: QuestRunService) {}

  @Post('start/:questId/single')
  async startSinglePlayer(@Param('questId') questId: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.questRunService.startSinglePlayer(questId, userId);
  }

  @Post('start/:questId/multiplayer')
  async startMultiplayer(@Param('questId') questId: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.questRunService.startMultiplayer(questId, userId);
  }

  @Patch('launch/:runId')
  @Permissions('host:run:own')
  @UseGuards(PermissionsGuard, QuestRunOwnershipGuard)
  async launchRun(
    @Param('runId') runId: string, 
  ) {
    return this.questRunService.launchRun(runId);
  }

  @Get(':runId/leaderboard')
  @Permissions('host:run:own')
  @UseGuards(PermissionsGuard, QuestRunOwnershipGuard)
  async getLeaderboard(@Param('runId') runId: string) {
    return this.questRunService.getLeaderboard(runId);
  }

  @Patch('complete/:runId')
  @Permissions('host:run:own')
  @UseGuards(PermissionsGuard, QuestRunOwnershipGuard)
  async finishRun(
    @Param('runId') runId: string,
  ) {
    return this.questRunService.completeRun(runId);
  }

  @Get('by-code/:code')
  async getByCode(@Param('code') code: string) {
    return this.questRunService.findBySessionCode(code);
  }
}
