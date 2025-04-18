import { IsNumber, IsUUID } from "class-validator";

export class LeaderboardItemDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  score?: number | null;
}