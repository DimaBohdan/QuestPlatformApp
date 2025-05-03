import { Controller, Post, Get, Patch, Delete, Param, Body, UploadedFile, UseGuards } from '@nestjs/common';
import { OptionService } from '../services/option.service';
import { CreateOptionDto} from '../dto/create.option.dto';
import { UpdateOptionDto } from '../dto/update.option.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { QuestTaskOwnershipGuard } from 'utils/guards/quest-task.ownership.guard';
import { OptionOwnershipGuard } from 'utils/guards/option.ownership.guard';

@ApiTags('Options')
@Controller('options')
@UseGuards(JwtAuthGuard)
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post(':taskId')
  @UseGuards(PermissionsGuard, QuestTaskOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Create new option' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @ApiBody({ type: CreateOptionDto })
  async createOption(
    @Param('taskId') taskId: string, 
    @Body() dto: CreateOptionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.optionService.createOption(taskId, dto, file);
  }

  @Get('task/:taskId')
  getOptionsByTask(@Param('taskId') taskId: string) {
    return this.optionService.getOptionsByTaskId(taskId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get option by id' })
  @ApiParam({ name: 'id', description: 'Option ID' })
  async getOption(@Param('id') id: string) {
    return this.optionService.getOptionById(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard, OptionOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Update option by id' })
  @ApiParam({ name: 'id', description: 'Option ID' })
  @ApiBody({ type: UpdateOptionDto })
  async updateOption(
    @Param('id') id: string, 
    @Body() dto: UpdateOptionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.optionService.updateOption(id, dto, file);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard, OptionOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Delete option by id' })
  @ApiParam({ name: 'id', description: 'Option ID' })
  async deleteOption(@Param('id') id: string) {
    return this.optionService.deleteOption(id);
  }
}
