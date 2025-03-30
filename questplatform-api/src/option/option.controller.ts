import { Controller, Post, Get, Patch, Delete, Param, Body, UploadedFile } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto} from './dto/create.option.dto';
import { UpdateOptionDto } from './dto/update.option.dto';

@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post(':taskId')
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
  getOption(@Param('id') id: string) {
    return this.optionService.getOptionById(id);
  }

  @Patch(':id')
  updateOption(
    @Param('taskId') id: string, 
    @Body() dto: CreateOptionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.optionService.updateOption(id, dto, file);
  }

  @Delete(':id')
  deleteOption(@Param('id') id: string) {
    return this.optionService.deleteOption(id);
  }
}
