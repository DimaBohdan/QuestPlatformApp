import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class QuestRunResultDto {
  @IsNotEmpty()
  @IsInt()
  correctCount: number;

  @IsNotEmpty()
  @IsInt()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  score: number
}