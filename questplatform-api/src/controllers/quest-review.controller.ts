import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateQuestReviewDto } from 'src/dto/create.quest-review.dto';
import { UpdateQuestReviewDto } from 'src/dto/update.quest-review.dto';
import { QuestReviewService } from 'src/services/quest-review.service';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { Public } from 'utils/decorators/public.decorator';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { QuestOwnershipGuard } from 'utils/guards/quest.ownership.guard';
import { ReviewOwnershipGuard } from 'utils/guards/review.ownership.guard';
import { RequestWithUser } from 'utils/types/RequestWithUser';

@ApiTags('Quest Review')
@Controller('quest-review')
@UseGuards(JwtAuthGuard)
export class QuestReviewController {
  constructor(private questReviewService: QuestReviewService) {}

  @Post(':questId')
  @ApiOperation({ summary: 'Create new review' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  @ApiBody({ type: CreateQuestReviewDto })
  async create(
    @Param('questId') questId: string, 
    @Body() dto: CreateQuestReviewDto,
    @Req() req: RequestWithUser,
  ) {
    return this.questReviewService.create(questId, req.user.id, dto);
  }

  @Get('reviews/:questId')
  @ApiOperation({ summary: 'Get reviews by questId' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  async getReviewsByQuest(@Param('questId') questId: string) {
    return this.questReviewService.getReviewsByQuest(questId);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get review by id' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  async getReviewById(@Param('id') id: string) {
    return this.questReviewService.getReviewById(id);
  }

  @UseGuards(PermissionsGuard, ReviewOwnershipGuard)
  @Permissions('user:edit:own')
  @Patch(':reviewId')
  @ApiOperation({ summary: 'Update review by id' })
  @ApiParam({ name: 'reviewId', description: 'Review ID' })
  @ApiBody({ type: UpdateQuestReviewDto })
  async updateOption(
    @Param('reviewId') id: string, 
    @Body() dto: UpdateQuestReviewDto,
  ) {
    return this.questReviewService.update(id, dto);
  }

  @UseGuards(PermissionsGuard, ReviewOwnershipGuard)
  @Permissions('user:edit:own', 'user:edit:any')
  @Delete(':reviewId')
  @ApiOperation({ summary: 'Delete review by id' })
  @ApiParam({ name: 'reviewId', description: 'Review ID' })
  async deleteOption(@Param('reviewId') id: string) {
    return this.questReviewService.delete(id);
  }
}
