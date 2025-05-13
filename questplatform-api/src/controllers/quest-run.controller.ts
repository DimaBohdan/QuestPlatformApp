import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { QuestRunService } from '../services/quest-run.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { QuestRunOwnershipGuard } from 'utils/guards/run.ownership.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { CreateQuestRunDto } from 'src/dto/create.quest-run.dto';

@ApiTags('Quest Run')
@Controller('quest-run')
export class QuestRunController {
  constructor(private readonly questRunService: QuestRunService) {}

  @Post('start/:questId/single')
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  async startSinglePlayer(
    @Param('questId') questId: string,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.questRunService.startSinglePlayer(questId, userId);
  }

  @Post('start/:questId/multiplayer')
  async startMultiplayer(
    @Param('questId') questId: string,
    @Req() req: RequestWithUser,
    @Body() data?: CreateQuestRunDto,
  ) {
    const userId = req.user.id;
    return this.questRunService.startMultiplayer(questId, userId, data);
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

  @Get('time/:runId')
  @Permissions('host:run:own', 'host:run:any')
  @UseGuards(PermissionsGuard, QuestRunOwnershipGuard)
  async findTimeSpent(@Param('runId') runId: string) {
    return this.questRunService.findTimeSpent(runId);
  }

  @Patch('complete/:runId')
  @Permissions('host:run:own')
  @UseGuards(PermissionsGuard, QuestRunOwnershipGuard)
  async finishRun(
    @Param('runId') runId: string,
  ) {
    return this.questRunService.completeRun(runId);
  }

  @Get(':runId')
  @Permissions('host:run:own', 'host:run:any')
  @UseGuards(PermissionsGuard, QuestRunOwnershipGuard)
  async getQuestRunById(@Param('runId') runId: string) {
    return this.questRunService.getQuestRunById(runId);
  }

  @Get('by-code/:code')
  async getByCode(@Param('code') code: string) {
    return this.questRunService.findBySessionCode(code);
  }
}
