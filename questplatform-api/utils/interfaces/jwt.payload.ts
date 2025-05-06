export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  nickname: string;
  avatar: string;
  info: string | null;
  createdAt: Date;
  completedQuestIds: string[];
}