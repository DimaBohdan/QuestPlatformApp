import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestDto {
  @ApiProperty({ description: 'The title of the quest' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the quest' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The difficulty of the quest' })
  @IsNotEmpty()
  @IsInt()
  difficulty: number;

  @ApiProperty({ description: 'The category of the quest' })
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
  

  @ApiProperty({ description: 'The tags of the quest' })
  @IsOptional()
  @IsArray()
  tags?: string[];
}