import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsUUID } from "class-validator";

export class CreatePlotChoiceDto {
  @ApiProperty({ description: 'The text of the choice' })
  @IsString()
  text: string;
  
  @ApiProperty({ description: 'Next node id' })
  @IsUUID()
  nextNodeId: string;
}