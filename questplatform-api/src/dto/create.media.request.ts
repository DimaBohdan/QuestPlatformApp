import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateMediaRequest {
  @ApiProperty({ description: 'The questId of the media' })
  @IsOptional()
  @IsString()
  questId?: string;

  @ApiProperty({ description: 'The taskId of the media' })
  @IsOptional()
  @IsString()
  taskId?: string;

  @ApiProperty({ description: 'The optionId of the media' })
  @IsOptional()
  @IsString()
  optionId?: string;
}