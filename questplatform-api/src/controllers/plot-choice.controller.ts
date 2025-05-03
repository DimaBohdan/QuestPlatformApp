import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PlotChoiceService } from 'src/services/plot-choice.service';
import { CreatePlotChoiceDto } from 'src/dto/create.plot-choice.dto';
import { UpdatePlotChoiceDto } from 'src/dto/update.plot-choice.dto';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { PlotNodeOwnershipGuard } from 'utils/guards/plot-node.ownership.guard';
import { PlotChoiceOwnershipGuard } from 'utils/guards/plot-choice.ownership.guard';

@ApiTags('Plot Choice')
@Controller('plot-choice')
@UseGuards(JwtAuthGuard)
export class PlotChoiceController {
  constructor(private readonly plotChoiceService: PlotChoiceService) {}

  @Post(':nodeId')
  @UseGuards(PermissionsGuard, PlotNodeOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Create new choice' })
  @ApiParam({ name: 'choiceId', description: 'Choice ID' })
  @ApiBody({ type: CreatePlotChoiceDto })
  async create(
    @Param('nodeId') nodeId: string,
    @Body() dto: CreatePlotChoiceDto,
  ) {
    return this.plotChoiceService.create(nodeId, dto);
  }

  @Get('node/:nodeId')
  @ApiOperation({ summary: 'Get choices by taskId' })
  getOptionsByTask(@Param('nodeId') nodeId: string) {
    return this.plotChoiceService.getChoicesByNode(nodeId);
  }

  @Get(':choiceId')
  @ApiOperation({ summary: 'Get choice by id' })
  @ApiParam({ name: 'choiceId', description: 'Choice ID' })
  async getOption(@Param('choiceId') id: string) {
    return this.plotChoiceService.getChoiceById(id);
  }

  @Patch(':choiceId')
  @UseGuards(PermissionsGuard, PlotChoiceOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Update choice by id' })
  @ApiParam({ name: 'choiceId', description: 'Choice ID' })
  @ApiBody({ type: UpdatePlotChoiceDto })
  async update(
    @Param('choiceId') id: string, 
    @Body() dto: UpdatePlotChoiceDto,
  ) {
    return this.plotChoiceService.update(id, dto);
  }

  @Delete(':choiceId')
  @UseGuards(PermissionsGuard, PlotChoiceOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Delete choice by id' })
  @ApiParam({ name: 'choiceId', description: 'Choice ID' })
  async delete(@Param('choiceId') id: string) {
    return this.plotChoiceService.delete(id);
  }
}
