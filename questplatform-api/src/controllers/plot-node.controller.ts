import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PlotNode } from '@prisma/client';
import { CreatePlotNodeDto } from 'src/dto/create.plot-node.dto';
import { PlotNodeService } from 'src/services/plot-node.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';

@Controller('plot-nodes')
export class PlotNodeController {
  constructor(private readonly plotNodeService: PlotNodeService) {}

  @Post('taskId')
  @ApiOperation({ summary: 'Create a new Plot Node' })
  @ApiBody({ type: CreatePlotNodeDto })
  async createQuest(
    @Req() req: RequestWithUser,
    @Param('taskId') taskId: string,
    @Body() dto: CreatePlotNodeDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<PlotNode> {
    return this.plotNodeService.create(taskId, dto, file);
  }

  @Patch('nodeId')
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
  @ApiOperation({ summary: 'Delete node by id' })
  @ApiParam({ name: 'nodeId', description: 'Node ID' })
  deleteOption(
    @Param('nodeId') id: string,
    @Req() req: RequestWithUser,
  ) {
    return this.plotNodeService.delete(id);
  }
}