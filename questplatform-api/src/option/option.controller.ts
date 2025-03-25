import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto} from './dto/create.option.dto';
import { UpdateOptionDto } from './dto/update.option.dto';

@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post(':taskId')
  createOption(@Param('taskId') taskId: string, @Body() dto: CreateOptionDto) {
    return this.optionService.createOption(taskId, dto);
  }

  // @Get('task/:taskId')
  // getOptionsByTask(@Param('taskId') taskId: string) {
  //   return this.optionService.getOptionsByTask(taskId);
  // }

  @Get(':id')
  getOption(@Param('id') id: string) {
    return this.optionService.getOptionById(id);
  }

  @Patch(':id')
  updateOption(@Param('id') id: string, @Body() dto: UpdateOptionDto) {
    return this.optionService.updateOption(id, dto);
  }

  @Delete(':id')
  deleteOption(@Param('id') id: string) {
    return this.optionService.deleteOption(id);
  }
}
