import { UserRole } from "@prisma/client";

export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  nickname: string;
  avatar: string;
  info: string | null;
  role: UserRole;
  createdAt: Date;
  completedQuestIds: string[];
}