import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOptionDto {
    @IsString()
    text: string;
  
    @IsBoolean()
    isCorrect: boolean;
}