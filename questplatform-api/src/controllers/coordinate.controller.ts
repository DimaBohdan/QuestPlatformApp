import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CoordinateService } from '../services/coordinate.service';
import { CreateCoordinateDto } from '../dto/coordinate.create.dto';
import { UpdateCoordinateDto } from '../dto/coordinate.update.dto';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { CoordinateOwnershipGuard } from 'utils/guards/coordinate.ownership.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { QuestTaskOwnershipGuard } from 'utils/guards/quest-task.ownership.guard';

@ApiTags('Coordinate')
@Controller('coordinates')
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService) {}

  @Post(':taskId')
  @UseGuards(PermissionsGuard, QuestTaskOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Create new coordinate' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @ApiBody({ type: CreateCoordinateDto })
  createCoordinate(
    @Param('taskId') taskId: string, 
    @Body() dto: CreateCoordinateDto,
  ) {
    return this.coordinateService.createCoordinate(taskId, dto);
  }

  @Get(':coordinateId')
  @ApiOperation({ summary: 'Get coordinate by id' })
  @ApiParam({ name: 'coordinateId', description: 'Coordinate ID' })
  getOption(@Param('coordinateId') id: string) {
    return this.coordinateService.getCoordinateById(id);
  }

  @Patch(':coordinateId')
  @UseGuards(PermissionsGuard, CoordinateOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Update coordinate by id' })
  @ApiParam({ name: 'coordinateId', description: 'Coordinate ID' })
  @ApiBody({ type: UpdateCoordinateDto })
  updateOption(
    @Param('coordinateId') id: string, 
    @Body() dto: UpdateCoordinateDto,
  ) {
    return this.coordinateService.updateCoordinare(id, dto);
  }

  @Delete(':coordinateId')
  @UseGuards(PermissionsGuard, CoordinateOwnershipGuard)
  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Delete coordinate by id' })
  @ApiParam({ name: 'coordinateId', description: 'Coordinate ID' })
  deleteOption(@Param('coordinateId') id: string) {
    return this.coordinateService.deleteCoordinate(id);
  }
}
