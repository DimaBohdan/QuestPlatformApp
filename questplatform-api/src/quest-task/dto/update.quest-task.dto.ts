import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { Option, QuestTaskType } from '@prisma/client';

export class UpdateQuestTaskDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsEnum(QuestTaskType)
  type?: QuestTaskType;
}
