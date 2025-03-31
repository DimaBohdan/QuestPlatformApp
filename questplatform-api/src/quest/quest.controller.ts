import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Delete, Request, Req, Patch, UploadedFile, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateQuestDto } from './dto/quest.create.dto';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { Category, Quest, User} from '@prisma/client';
import { QuestService } from './quest.service';
import { UpdateQuestDto } from './dto/quest.update.dto';
import { RolesGuard } from 'utils/guards/roles.guard';
import { Public } from 'utils/decorators/public.decorator';
import { UserRequest } from 'utils/decorators/user.decorator';
import { CaslForbiddenError } from 'utils/decorators/casl-forbidden-error.decorator';
import { CaslForbiddenErrorI } from 'utils/permissions/casl-rules.factory';
import { subject } from '@casl/ability';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  async getPublicQuests(
    @Query('title') title?: string,
    @Query('category') category?: Category,
    @Query('difficulty') difficulty?: number,
  ): Promise<Quest[]> {
    return this.questService.getAllPublicQuests({ title, category, difficulty });
  }

  @Get('/my')
  @ApiOperation({ summary: 'Get quest created by user' })
  @ApiQuery({ name: 'title', required: false, description: 'Filter by quest title' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by quest category' })
  @ApiQuery({ name: 'difficulty', required: false, description: 'Filter by quest difficulty', type: Number })
  async getMyQuests(
    @Req() req: RequestWithUser,
    @Query('title') title?: string,
    @Query('category') category?: Category,
    @Query('difficulty') difficulty?: number,
  ): Promise<Quest[]> {
    return this.questService.getMyQuests(req.user.id, { title, category, difficulty });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get quest by id' })
  @ApiParam({ name: 'id', description: 'Quest ID' })
  async getQuestById(@Param('id') id: string): Promise<Quest> {
    return this.questService.findQuestById(id);
  }

  @Post(':questId/start')
  @ApiOperation({ summary: 'Start new quest session' })
  @ApiParam({ name: 'questId', description: 'Quest ID to start' })
  async startQuest(
    @Req() req: RequestWithUser, 
    @Param('questId') questId: string
  ) {
    return await this.questService.startQuest(req.user.id, questId);
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
