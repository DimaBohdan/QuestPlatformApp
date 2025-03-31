import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuestTaskType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBaseQuestTaskDto {
  @ApiProperty({ description: 'The question of the task' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ description: 'The type of the task' })
  @IsNotEmpty()
  @IsEnum(QuestTaskType)
  type: QuestTaskType;
}