import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateAiDistractorDto } from "src/dto/create.ai-distractor.dto";
import { AiService } from "src/services/ai.service";

@ApiTags('AI')
@Controller('ai')
@UseGuards()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  @ApiBody({ type: CreateAiDistractorDto })
  async generateDistractors(@Body() data: CreateAiDistractorDto) {
    return this.aiService.generate(data);
  }
}