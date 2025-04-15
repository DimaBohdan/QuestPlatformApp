import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlotNodeDto {
  @ApiProperty({ description: 'The text of the node' })
  @IsNotEmpty()
  @IsString()
  text: string;
  
  @ApiProperty({ description: 'Is node start' })
  @IsOptional()
  @IsBoolean()
  isStart?: boolean;
}