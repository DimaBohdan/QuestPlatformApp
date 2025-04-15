import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCoordinateDto {
  @ApiProperty({ description: 'position X' })
  @IsNumber()
  positionX: number;
  
  @ApiProperty({ description: 'position Y' })
  @IsNumber()
  positionY: number;

  @ApiProperty({ description: 'Maximum distance from correct point to user answer point to be correct' })
  @IsNumber()
  radius?: number;
}