import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CoordinateService } from '../services/coordinate.service';
import { CreateCoordinateDto } from '../dto/coordinate.create.dto';
import { UpdateCoordinateDto } from '../dto/coordinate.update.dto';

@ApiTags('Coordinate')
@Controller('coordinates')
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService) {}

  @Post(':taskId')
  @ApiOperation({ summary: 'Create new coordinate' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @ApiBody({ type: CreateCoordinateDto })
  createCoordinate(
    @Param('taskId') taskId: string, 
    @Body() dto: CreateCoordinateDto,
  ) {
    return this.coordinateService.createCoordinate(taskId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get coordinate by id' })
  @ApiParam({ name: 'id', description: 'Coordinate ID' })
  getOption(@Param('id') id: string) {
    return this.coordinateService.getCoordinateById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update coordinate by id' })
  @ApiParam({ name: 'id', description: 'Coordinate ID' })
  @ApiBody({ type: UpdateCoordinateDto })
  updateOption(
    @Param('id') id: string, 
    @Body() dto: UpdateCoordinateDto,
  ) {
    return this.coordinateService.updateCoordinare(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete coordinate by id' })
  @ApiParam({ name: 'id', description: 'Coordinate ID' })
  deleteOption(@Param('id') id: string) {
    return this.coordinateService.deleteCoordinate(id);
  }
}
