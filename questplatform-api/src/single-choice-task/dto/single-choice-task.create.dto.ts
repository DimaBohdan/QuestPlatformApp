import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSingleChoiceTaskDto {
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