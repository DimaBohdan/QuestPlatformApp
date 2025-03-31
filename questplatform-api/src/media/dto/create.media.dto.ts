import { ApiProperty } from "@nestjs/swagger";
import { MediaFileType } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMediaDto {
  @ApiProperty({ description: 'The url of the media' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'The publicId of the media' })
  @IsOptional()
  @IsString()
  public_id?: string;

  @ApiProperty({ description: 'The type of the media' })
  @IsNotEmpty()
  @IsEnum(MediaFileType)
  type: MediaFileType;

  @ApiProperty({ description: 'The width of the media' })
  @IsOptional()
  @IsInt()
  width?: number;

  @ApiProperty({ description: 'The height of the media' })
  @IsOptional()
  @IsInt()
  height?: number;

  @ApiProperty({ description: 'The duration of the media' })
  @IsOptional()
  @IsNumber()
  duration?: number;

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
