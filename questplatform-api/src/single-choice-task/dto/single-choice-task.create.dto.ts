import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSingleChoiceTaskDto {
  @ApiProperty({ description: 'The questId of the task' })
  @IsNotEmpty()
  @IsUUID()
  questId: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsArray()
  options: string[];

  @IsString()
  correctAnswers: string[];
}