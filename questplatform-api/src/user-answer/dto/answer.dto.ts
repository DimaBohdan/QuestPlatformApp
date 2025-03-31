import { ApiProperty } from "@nestjs/swagger";
import { Option, UserAnswer } from "@prisma/client";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UserAnswerDTO {
  @ApiProperty({ description: 'Options selected by user as correct' })
  @IsArray()
  selectedOptions?: string[];

  @ApiProperty({ description: 'The text answer' })
  @IsString()
  textAnswer?: string;

  @ApiProperty({ description: 'Coordinates selected by user on map as correct' })
  @IsArray()
  selectedCoordsId?: string;

  @ApiProperty({ description: 'Plot choices selected by user' })
  @IsString()
  plotChoiceId?: string;
}