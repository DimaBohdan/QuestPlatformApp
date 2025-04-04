import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { Option, QuestTaskType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestTaskDto {
  @ApiProperty({ description: 'The question of the task' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ description: 'The type of the task' })
  @IsNotEmpty()
  @IsEnum(QuestTaskType)
  type: QuestTaskType;

  @ApiProperty({ description: 'The answer of the task' })
  @IsOptional()
  @IsString()
  textAnswer?: string; // TEXT_FIELD

  @IsOptional()
  @IsNumber()
  targetX?: number; // FIND_ON_PICTURE, FIND_ON_MAP

  @IsOptional()
  @IsNumber()
  targetY?: number; // FIND_ON_PICTURE, FIND_ON_MAP

  @IsOptional()
  @IsNumber()
  radius?: number; // FIND_ON_PICTURE, FIND_ON_MAP

  @IsOptional()
  @IsString()
  content?: string; // PLOT

  @IsOptional()
  choices?: Record<string, any>; // PLOT (JSON format)
}
