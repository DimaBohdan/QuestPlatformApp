import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateQuestReviewDto } from 'src/dto/create.quest-review.dto';
import { UpdateQuestReviewDto } from 'src/dto/update.quest-review.dto';
import { QuestReviewService } from 'src/services/quest-review.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';

@Controller('quest-review')
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
  getReviewsByQuest(@Param('questId') questId: string) {
    return this.questReviewService.getReviewsByQuest(questId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by id' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  async getReviewById(@Param('id') id: string) {
    return this.questReviewService.getReviewById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update review by id' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiBody({ type: UpdateQuestReviewDto })
  async updateOption(
    @Param('id') id: string, 
    @Body() dto: UpdateQuestReviewDto,
  ) {
    return this.questReviewService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete review by id' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  async deleteOption(@Param('id') id: string) {
    return this.questReviewService.delete(id);
  }
}
