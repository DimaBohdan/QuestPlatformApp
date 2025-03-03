import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Delete, Request, Req, Patch, UploadedFile } from '@nestjs/common';
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

@Controller('quest')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Public()
  @Get()
  async getPublicQuests(
    @Query('title') title?: string,
    @Query('category') category?: Category,
    @Query('difficulty') difficulty?: number,
  ): Promise<Quest[]> {
    return this.questService.getAllPublicQuests({ title, category, difficulty });
  }

  @Get('/my')
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
  async getQuestById(@Param('id') id: string): Promise<Quest> {
    return this.questService.findQuestById(id);
  }

  @Post()
  async createQuest(
    @Body() data: CreateQuestDto,
    @UserRequest() user: User,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Quest>  {
    return this.questService.createQuest(data, user.id, file);
  }

  @Patch(':id')
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
  async deleteQuest(
    @Param('id') id: string,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
    ): Promise<Quest> {
    const quest = await this.questService.findQuestById(id);
    forbiddenError.throwUnlessCan('manage', subject('Quest', quest));
    return this.questService.deleteQuest(id);
  }
}
