import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Delete, Request, Req, Patch, UploadedFile, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateQuestDto } from '../dto/quest.create.dto';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { Category, Quest, User} from '@prisma/client';
import { QuestService } from '../services/quest.service';
import { UpdateQuestDto } from '../dto/quest.update.dto';
import { RolesGuard } from 'utils/guards/roles.guard';
import { Public } from 'utils/decorators/public.decorator';
import { CaslForbiddenError } from 'utils/decorators/casl-forbidden-error.decorator';
import { CaslForbiddenErrorI } from 'utils/permissions/casl-rules.factory';
import { subject } from '@casl/ability';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QuestSortField } from '../enums/QuestSortField.enum';
import { QuestSortOrder } from '../enums/QuestSortOrder.enum';

@ApiTags('Quest')
@Controller('quest')
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Get(':id')
  @ApiOperation({ summary: 'Get quest by id' })
  @ApiParam({ name: 'id', description: 'Quest ID' })
  async getQuestById(
    @Param('id') id: string,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  ): Promise<Quest> {
    const quest = await this.questService.findQuestById(id);
    forbiddenError.throwUnlessCan('read', subject('Quest', quest));
    return this.questService.findQuestById(id);
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

  @Patch(':id')
  @ApiOperation({ summary: 'Change info about quest' })
  @ApiBody({ type: UpdateQuestDto })
  async updateQuest(
    @Param('id') id: string,
    @Body() data: UpdateQuestDto,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Quest>  {
    const quest = await this.questService.findQuestById(id);
    forbiddenError.throwUnlessCan('manage', subject('Quest', quest));
    return this.questService.updateQuest(id, data, file);
  }

  @Patch('draft/:id')
  @ApiOperation({ summary: 'Make quest draft' })
  async setQuestDraft(
    @Param('id') id: string,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI
  ): Promise<Quest> {
    const quest = await this.questService.findQuestById(id);
    forbiddenError.throwUnlessCan('manage', subject('Quest', quest));
    return this.questService.setQuestDraft(id);
  }

  @Patch('ready/:id')
  @ApiOperation({ summary: 'Make quest ready' })
  async setQuestReady(
    @Param('id') id: string,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI
  ): Promise<Quest> {
    const quest = await this.questService.findQuestById(id);
    forbiddenError.throwUnlessCan('manage', subject('Quest', quest));
    return this.questService.setQuestReady(id);
  }

  @Patch('public/:id')
  @ApiOperation({ summary: 'Publish quest' })
  async setQuestPublished(
    @Param('id') id: string,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI
  ): Promise<Quest> {
    const quest = await this.questService.findQuestById(id);
    forbiddenError.throwUnlessCan('manage', subject('Quest', quest));
    return this.questService.setQuestPublished(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quest' })
  @ApiParam({ name: 'id', description: 'Quest ID to delete' })
  async deleteQuest(
    @Param('id') id: string,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
    ): Promise<Quest> {
    const quest = await this.questService.findQuestById(id);
    forbiddenError.throwUnlessCan('manage', subject('Quest', quest));
    return this.questService.deleteQuest(id);
  }
}
