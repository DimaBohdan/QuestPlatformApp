import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateQuestDto {
  @ApiProperty({ description: 'The title of the quest' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'The description of the quest' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The difficulty of the quest' })
  @IsOptional()
  @IsInt()
  difficulty?: number;

  @ApiProperty({ description: 'The category of the quest' })
  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @ApiProperty({ description: 'The tags of the quest' })
  @IsOptional()
  @IsArray()
  tags?: string[];
}