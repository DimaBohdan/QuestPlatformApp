import { IsOptional, IsString, IsEnum, IsInt, IsArray, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestSortField } from 'src/enums/QuestSortField.enum';
import { Category } from '@prisma/client';
import { QuestSortOrder } from 'src/enums/QuestSortOrder.enum';

export class QuestsQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  minDifficulty?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  maxDifficulty?: number;

  @IsOptional()
  @Type(() => Number)
  minRating?: number;

  @IsOptional()
  @Type(() => Number)
  maxRating?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(QuestSortField)
  sortBy?: QuestSortField;

  @IsOptional()
  @IsEnum(QuestSortOrder)
  sortOrder?: QuestSortOrder;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}
