import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class QuestionTaskDTO {
  @ApiProperty({ description: 'The question' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ description: 'The time maximum for the quest' })
  @IsOptional()
  @IsInt()
  time?: number;
}