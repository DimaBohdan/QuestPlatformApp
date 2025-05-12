import { Category } from "@prisma/client";

export type QuestFilter = {
  title?: string;
  category?: Category;
  minDifficulty?: number;
  maxDifficulty?: number;
  minRating?: number;
  maxRating?: number;
  tags?: string[];
};
