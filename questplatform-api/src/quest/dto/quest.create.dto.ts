import { Category } from '@prisma/client';
import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  time?: number;

  @IsNotEmpty()
  @IsInt()
  difficulty: number;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsOptional()
  @IsArray()
  tags?: string[];
}