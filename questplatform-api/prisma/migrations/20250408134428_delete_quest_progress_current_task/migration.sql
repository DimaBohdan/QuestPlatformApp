/*
  Warnings:

  - You are about to drop the column `completed` on the `UserQuestProgress` table. All the data in the column will be lost.
  - You are about to drop the column `currentTaskIndex` on the `UserQuestProgress` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `UserQuestProgress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestRun" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserQuestProgress" DROP COLUMN "completed",
DROP COLUMN "currentTaskIndex",
DROP COLUMN "startTime";
