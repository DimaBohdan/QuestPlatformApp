import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAnswerDTO } from 'src/dto/answer.dto';
import { UserAnswerService } from 'src/services/user-answer.service';
import { RequestWithUser } from 'utils/types/RequestWithUser';

@ApiTags('User Answer')
@Controller('user-answer')
export class UserAnswerController {
  constructor(
    private readonly userAnswerService: UserAnswerService,
  ) {}

  @Post(':runId/:taskId')
  @ApiOperation({ summary: 'Submit answer for task' })
  @ApiParam({ name: 'runId', description: 'Run ID' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @ApiBody({ type: UserAnswerDTO }) 
  async submitAnswer(
    @Param('runId') runId: string,
    @Param('taskId') taskId: string,
    @Body() answer: UserAnswerDTO,
    @Req() req: RequestWithUser
  ) {
    return await this.userAnswerService.submitAnswer(runId, req.user.id, taskId, answer);
  }
}
