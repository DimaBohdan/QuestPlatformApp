import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAiDistractorDto {
  @ApiProperty({ description: 'Question' })
  @IsString()
  question: string;
  
  @ApiProperty({ description: 'Correct Answer' })
  @IsString()
  correctAnswer: string;
}