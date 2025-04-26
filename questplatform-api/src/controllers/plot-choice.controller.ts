import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PlotChoiceService } from 'src/services/plot-choice.service';
import { CreatePlotChoiceDto } from 'src/dto/create.plot-choice.dto';
import { UpdatePlotChoiceDto } from 'src/dto/update.plot-choice.dto';

@ApiTags('Plot Choice')
@Controller('plot-choice')
export class PlotChoiceController {
  constructor(private readonly plotChoiceService: PlotChoiceService) {}

  @Post(':nodeId')
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

  @Get(':id')
  @ApiOperation({ summary: 'Get choice by id' })
  @ApiParam({ name: 'id', description: 'Choice ID' })
  async getOption(@Param('id') id: string) {
    return this.plotChoiceService.getChoiceById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update choice by id' })
  @ApiParam({ name: 'id', description: 'Choice ID' })
  @ApiBody({ type: UpdatePlotChoiceDto })
  async update(
    @Param('id') id: string, 
    @Body() dto: UpdatePlotChoiceDto,
  ) {
    return this.plotChoiceService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete choice by id' })
  @ApiParam({ name: 'id', description: 'Choice ID' })
  async delete(@Param('id') id: string) {
    return this.plotChoiceService.delete(id);
  }
}
