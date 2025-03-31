import { Category } from '@prisma/client';
import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSingleChoiceTaskDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsOptional()
  @IsString()
  answerIds?: string;
}