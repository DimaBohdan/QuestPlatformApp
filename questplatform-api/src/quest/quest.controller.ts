import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Delete, Request } from '@nestjs/common';
import { CreateQuestDto } from './dto/quest.create.dto';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { Category, Quest, User} from '@prisma/client';
import { QuestService } from './quest.service';
import { UpdateQuestDto } from './dto/quest.update.dto';
import { RolesGuard } from 'utils/guards/roles.guard';
import { Public } from 'utils/decorators/public.decorator';
import { UserRequest } from 'utils/decorators/user.decorator';
import { IsOwner } from 'utils/guards/isOwner.guard';

@Controller('quest')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Public()
  @Get()
  async getQuests(
    @Query('title') title?: string,
    @Query('category') category?: Category,
    @Query('difficulty') difficulty?: number,
  ): Promise<Quest[]> {
    return this.questService.getAllPublicQuests({ title, category, difficulty });
  }

  @Public()
  @Get(':id')
  async getQuestById(@Param('id') id: string): Promise<Quest> {
    return this.questService.getQuestById(id);
  }

  @Post()
  async createQuest(
    @Body() data: CreateQuestDto,
    @UserRequest() user: User
  ): Promise<Quest>  {
    return this.questService.createQuest(data, user.id);
  }

  @UseGuards(IsOwner('quest', 'authorId'))
  @Put(':id')
  async updateQuest(
    @Param('id') id: string,
    @Body() data: UpdateQuestDto
  ): Promise<Quest>  {
    return this.questService.updateQuest(id, data);
  }

  @UseGuards(IsOwner('quest', 'authorId'))
  @Delete(':id')
  async deleteQuest(
    @Param('id') id: string,
    ): Promise<Quest> {
    return this.questService.deleteQuest(id);
  }
}
