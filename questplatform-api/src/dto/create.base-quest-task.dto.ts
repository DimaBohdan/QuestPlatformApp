import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { QuestTaskType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBaseQuestTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsNotEmpty()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'The question of the task' })
  @IsNotEmpty()
  @IsString()
  question: string;
  
  @ApiProperty({ description: 'The time maximum for the task' })
  @IsOptional()
  @IsInt()
  time?: number;

  @ApiProperty({ description: 'The type of the task' })
  @IsNotEmpty()
  @IsEnum(QuestTaskType)
  type: QuestTaskType;
}