import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOptionDto {
    @IsString()
    text: string;
  
    @IsOptional()
    @IsString()
    mediaId?: string;
  
    @IsBoolean()
    isCorrect: boolean;
}