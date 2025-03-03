import { MediaFile, User } from '@prisma/client';
import { Quest } from '@prisma/client';

export type SubjectsList = {
  User: User;
  Quest: Quest;
  MediaFile: MediaFile;
};