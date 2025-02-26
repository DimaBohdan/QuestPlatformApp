import { MediaFileType } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  public_id?: string;

  @IsNotEmpty()
  @IsEnum(MediaFileType)
  type: MediaFileType;

  @IsOptional()
  @IsInt()
  width?: number;

  @IsOptional()
  @IsInt()
  height?: number;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  questId?: string;

  @IsOptional()
  @IsString()
  taskId?: string;

  @IsOptional()
  @IsString()
  optionId?: string;
}
