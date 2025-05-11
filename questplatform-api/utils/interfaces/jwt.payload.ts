export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  nickname: string;
  avatar: string;
  customerId: string | null;
  info: string | null;
  createdAt: Date;
  completedQuestIds: string[];
}