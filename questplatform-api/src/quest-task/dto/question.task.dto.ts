import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class QuestionTaskDTO {
  @ApiProperty({ description: 'The question' })
  @IsNotEmpty()
  @IsString()
  question: string;
}