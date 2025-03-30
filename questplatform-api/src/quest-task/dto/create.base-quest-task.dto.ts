import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuestTaskType } from '@prisma/client';

export class CreateBaseQuestTaskDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsEnum(QuestTaskType)
  type: QuestTaskType;
}