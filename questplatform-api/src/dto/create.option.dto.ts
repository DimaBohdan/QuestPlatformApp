import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOptionDto {
  @ApiProperty({ description: 'The text of the option' })
  @IsString()
  text: string;
  
  @ApiProperty({ description: 'Is option correct' })
  @IsBoolean()
  isCorrect: boolean;
}