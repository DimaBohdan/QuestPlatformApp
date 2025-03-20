import { IsOptional, IsObject, IsArray } from 'class-validator';

export class AnswerDto {
  @IsOptional()
  answer?: any;

  @IsOptional()
  @IsObject()
  extraData?: Record<string, any>;

  @IsOptional()
  @IsArray()
  multipleAnswers?: any[];
}
