import { Controller, Post, Get, Patch, Delete, Param, Body, UploadedFile } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto} from './dto/create.option.dto';
import { UpdateOptionDto } from './dto/update.option.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Options')
@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post(':taskId')
  @ApiOperation({ summary: 'Create new option' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @ApiBody({ type: CreateOptionDto })
  createOption(
    @Param('taskId') taskId: string, 
    @Body() dto: CreateOptionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.optionService.createOption(taskId, dto, file);
  }

  // @Get('task/:taskId')
  // getOptionsByTask(@Param('taskId') taskId: string) {
  //   return this.optionService.getOptionsByTask(taskId);
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get option by id' })
  @ApiParam({ name: 'id', description: 'Option ID' })
  getOption(@Param('id') id: string) {
    return this.optionService.getOptionById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update option by id' })
  @ApiParam({ name: 'id', description: 'Option ID' })
  @ApiBody({ type: CreateOptionDto })
  updateOption(
    @Param('id') id: string, 
    @Body() dto: CreateOptionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.optionService.updateOption(id, dto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete option by id' })
  @ApiParam({ name: 'id', description: 'Option ID' })
  deleteOption(@Param('id') id: string) {
    return this.optionService.deleteOption(id);
  }
}
