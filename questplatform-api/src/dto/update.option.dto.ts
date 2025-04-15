import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateOptionDto {
  @ApiProperty({ description: 'The text of the option' })
  @IsOptional()
  @IsString()
  text?: string;
  
  @ApiProperty({ description: 'The mediaId of the option' })
  @IsOptional()
  @IsString()
  mediaId?: string;
  
  @ApiProperty({ description: 'Is option correct?' })
  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}