import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { QuestViewService } from './quest-view.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { RequestWithUser } from 'utils/types/RequestWithUser';

@ApiTags('Quest Views')
@Controller('quest-view')
export class QuestViewController {
  constructor(private questViewService: QuestViewService) {}

  @Post(':questId')
  @ApiOperation({ summary: 'Track quest view' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  async trackView(@Param('questId') questId: string, @Req() req: RequestWithUser) {
    const userId = req.user?.id || null;
    const sessionId = req.cookies?.sessionId || null;
    await this.questViewService.trackView(userId, sessionId, questId);
    return { message: 'Quest view tracked' };
  }
}
