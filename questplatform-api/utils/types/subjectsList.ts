import { Coordinate, MediaFile, Option, QuestReview, QuestRun, QuestTask, User, UserQuestProgress } from '@prisma/client';
import { Quest } from '@prisma/client';

export type SubjectsList = {
  User: User;
  Quest: Quest;
  QuestTask: QuestTask;
  QuestRun: QuestRun;
  UserQuestProgress: UserQuestProgress;
  Option: Option;
  Coordinate: Coordinate;
  QuestReview: QuestReview;
  MediaFile: MediaFile;
};