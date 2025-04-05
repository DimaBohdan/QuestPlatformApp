import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdatePlotNodeDto {
  @ApiProperty({ description: 'The text of the Plot Node' })
  @IsOptional()
  @IsString()
  text?: string;
  
  @ApiProperty({ description: 'Is node starting?' })
  @IsOptional()
  @IsBoolean()
  isStart?: boolean;
}