import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PlotNode } from '@prisma/client';
import { CreatePlotNodeDto } from 'src/dto/create.plot-node.dto';
import { PlotNodeService } from 'src/services/plot-node.service';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { PlotNodeOwnershipGuard } from 'utils/guards/plot-node.ownership.guard';
import { QuestTaskOwnershipGuard } from 'utils/guards/quest-task.ownership.guard';
import { RequestWithUser } from 'utils/types/RequestWithUser';

@ApiTags('Plot Node')
@Controller('plot-nodes')
@UseGuards(JwtAuthGuard)
export class PlotNodeController {
  constructor(private readonly plotNodeService: PlotNodeService) {}

  @Post('taskId')
  @UseGuards(PermissionsGuard, QuestTaskOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Create a new Plot Node' })
  @ApiBody({ type: CreatePlotNodeDto })
  async createQuest(
    @Param('taskId') taskId: string,
    @Body() dto: CreatePlotNodeDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<PlotNode> {
    return this.plotNodeService.create(taskId, dto, file);
  }

  @Patch('nodeId')
  @UseGuards(PermissionsGuard, PlotNodeOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Change an existing Plot Node' })
  @ApiParam({ name: 'nodeId', description: 'Node ID' })
  @ApiBody({ type: CreatePlotNodeDto })
  async update(
    @Req() req: RequestWithUser,
    @Param('nodeId') nodeId: string,
    @Body() dto: CreatePlotNodeDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<PlotNode> {
    return this.plotNodeService.update(nodeId, dto, file);
  }

  @Get(':nodeId')
  @ApiOperation({ summary: 'Get plot node by nodeId' })
  @ApiParam({ name: 'nodeId', description: 'Node ID' })
  getPlotNodeById(@Param('nodeId') id: string) {
    return this.plotNodeService.getPlotNodeById(id);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Get nodes by taskId' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  getPlotNodesByTaskId(@Param('taskId') id: string) {
    return this.plotNodeService.getPlotNodesByTaskId(id);
  }

  @Delete(':nodeId')
  @UseGuards(PermissionsGuard, PlotNodeOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Delete node by id' })
  @ApiParam({ name: 'nodeId', description: 'Node ID' })
  deleteOption(
    @Param('nodeId') id: string,
    @Req() req: RequestWithUser,
  ) {
    return this.plotNodeService.delete(id);
  }
}