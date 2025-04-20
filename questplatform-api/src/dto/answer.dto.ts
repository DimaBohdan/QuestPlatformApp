import { ApiProperty } from "@nestjs/swagger";
import { Option, UserAnswer } from "@prisma/client";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserAnswerDTO {
  @IsOptional()
  @ApiProperty({ description: 'Options selected by user as correct' })
  @IsArray()
  selectedOptions?: string[];

  @IsOptional()
  @ApiProperty({ description: 'The text answer' })
  @IsString()
  textAnswer?: string;

  @IsOptional()
  @ApiProperty({ description: 'Coordinates selected by user on map as correct' })
  @IsArray()
  selectedCoordsId?: string;

  @IsOptional()
  @ApiProperty({ description: 'Plot choices selected by user' })
  @IsString()
  plotChoiceId?: string;
}