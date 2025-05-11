import { IsOptional, IsISO8601 } from 'class-validator';

export class CreateQuestRunDto {
  @IsOptional()
  @IsISO8601()
  scheduledAt?: string;
}