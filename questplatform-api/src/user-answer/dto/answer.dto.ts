import { Option, UserAnswer } from "@prisma/client";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UserAnswerDTO {
  @IsArray()
  selectedOptions?: string[];

  @IsString()
  textAnswer?: string;

  @IsArray()
  selectedCoordsId?: string;

  @IsString()
  plotChoiceId?: string;
}