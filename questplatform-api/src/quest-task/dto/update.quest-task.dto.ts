import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { Option, QuestTaskType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestTaskDto {
  @ApiProperty({ description: 'The question of the task' })
  @IsOptional()
  @IsString()
  question?: string;

  @ApiProperty({ description: 'The type of the task' })
  @IsOptional()
  @IsEnum(QuestTaskType)
  type?: QuestTaskType;
}
