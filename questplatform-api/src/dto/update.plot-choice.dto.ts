import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdatePlotChoiceDto {
  @IsOptional()
  @ApiProperty({ description: 'The text of the choice' })
  @IsString()
  text: string;
  
  @IsOptional()
  @ApiProperty({ description: 'Next node id' })
  @IsUUID()
  nextNodeId: string;
}