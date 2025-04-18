import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateQuestReviewDto {
  @IsOptional()
  @ApiProperty({ description: 'Rating score' })
  @IsInt()
  score?: number;
  
  @IsOptional()
  @ApiProperty({ description: 'Comment' })
  @IsString()
  comment?: string;
}