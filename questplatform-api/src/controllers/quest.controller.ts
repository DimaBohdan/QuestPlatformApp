import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Delete, Request, Req, Patch, UploadedFile, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateQuestDto } from '../dto/quest.create.dto';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { Category, Quest, QuestStatus, QuestTaskType, User} from '@prisma/client';
import { QuestService } from '../services/quest.service';
import { UpdateQuestDto } from '../dto/quest.update.dto';
import { Public } from 'utils/decorators/public.decorator';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QuestSortField } from '../enums/QuestSortField.enum';
import { QuestSortOrder } from '../enums/QuestSortOrder.enum';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { QuestOwnershipGuard } from 'utils/guards/quest.ownership.guard';

@ApiTags('Quest')
@Controller('quest')
@UseGuards(JwtAuthGuard)
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all public quests' })
  @ApiQuery({ name: 'title', required: false, description: 'Filter by quest title' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by quest category' })
  @ApiQuery({ name: 'difficulty', required: false, description: 'Filter by quest difficulty', type: Number })
  @ApiQuery({ name: 'sortBy', required: false, enum: QuestSortField, description: 'Sort by parameters' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: QuestSortOrder, description: 'Choose sortOrder' })
  async getPublishedQuests(
    @Query('title') title?: string,
    @Query('category') category?: Category,
    @Query('difficulty') difficulty?: number,
    @Query('sortBy') sortBy?: QuestSortField,
    @Query('sortOrder') sortOrder?: QuestSortOrder,
  ): Promise<Quest[]> {
    return this.questService.getAllPublishedQuests({ title, category, difficulty }, { sortBy, sortOrder });
  }

  @Get('/my')
  @ApiOperation({ summary: 'Get quests created by user' })
  @ApiQuery({ name: 'title', required: false, description: 'Filter by quest title' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by quest category' })
  @ApiQuery({ name: 'difficulty', required: false, description: 'Filter by quest difficulty', type: Number })
  async getMyQuests(
    @Req() req: RequestWithUser,
    @Query('title') title?: string,
    @Query('category') category?: Category,
    @Query('difficulty') difficulty?: number,
  ): Promise<Quest[]> {
    return this.questService.getAllMyQuests(req.user.id, { title, category, difficulty });
  }

  @Get('/my-ready')
  @ApiOperation({ summary: 'Get quests created by user' })
  @ApiQuery({ name: 'title', required: false, description: 'Filter by quest title' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by quest category' })
  @ApiQuery({ name: 'difficulty', required: false, description: 'Filter by quest difficulty', type: Number })
  async getMyReadyQuests(
    @Req() req: RequestWithUser,
    @Query('title') title?: string,
    @Query('category') category?: Category,
    @Query('difficulty') difficulty?: number,
  ): Promise<Quest[]> {
    return this.questService.getMyReadyQuests(req.user.id, { title, category, difficulty });
  }

  @Public()
  @Get('public/:questId')
  @ApiOperation({ summary: 'Get public quest by id' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  async getQuestById(
    @Param('questId') id: string,
  ): Promise<Quest> {
    return this.questService.findQuestById(id, QuestStatus.PUBLISHED);
  }

  @Public()
  @Get('my-ready/:questId')
  @ApiOperation({ summary: 'Get public quest by id' })
  @ApiParam({ name: 'questId', description: 'Quest ID' })
  async getReadyQuestById(
    @Param('questId') id: string,
  ): Promise<Quest> {
    return this.questService.findQuestById(id, QuestStatus.PUBLISHED);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new quest' })
  @ApiBody({ type: CreateQuestDto })
  async createQuest(
    @Body() data: CreateQuestDto,
    @Req() req: RequestWithUser,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Quest>  {
    return this.questService.createQuest(data, req.user.id, file);
  }

  @Patch(':questId')
  @UseGuards(PermissionsGuard, QuestOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Change info about quest' })
  @ApiBody({ type: UpdateQuestDto })
  async updateQuest(
    @Param('questId') id: string,
    @Body() data: UpdateQuestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Quest>  {
    return this.questService.updateQuest(id, data, file);
  }

  @Patch('draft/:questId')
  @UseGuards(PermissionsGuard, QuestOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Make quest draft' })
  async setQuestDraft(
    @Param('questId') id: string,
  ): Promise<Quest> {
    return this.questService.setQuestDraft(id);
  }

  @Patch('ready/:questId')
  @UseGuards(PermissionsGuard, QuestOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Make quest ready' })
  async setQuestReady(
    @Param('questId') id: string,
  ): Promise<Quest> {
    return this.questService.setQuestReady(id);
  }

  @Patch('public/:questId')
  @UseGuards(PermissionsGuard, QuestOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Publish quest' })
  async setQuestPublished(
    @Param('questId') id: string,
  ): Promise<Quest> {
    return this.questService.setQuestPublished(id);
  }

  @Delete(':questId')
  @UseGuards(PermissionsGuard, QuestOwnershipGuard)
  @Permissions('user:edit:own', 'user:edit:any')
  @ApiOperation({ summary: 'Delete quest' })
  @ApiParam({ name: 'questId', description: 'Quest ID to delete' })
  async deleteQuest(
    @Param('questId') id: string,
    ): Promise<Quest> {
    return this.questService.deleteQuest(id);
  }
}
