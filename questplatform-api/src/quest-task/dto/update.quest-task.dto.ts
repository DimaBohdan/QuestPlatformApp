import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { Option, QuestTaskType } from '@prisma/client';

export class UpdateQuestTaskDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsEnum(QuestTaskType)
  type?: QuestTaskType;

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
