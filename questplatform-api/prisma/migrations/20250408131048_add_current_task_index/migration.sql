/*
  Warnings:

  - You are about to drop the column `currentQuestionIndex` on the `UserQuestProgress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestRun" ADD COLUMN     "currentTaskIndex" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserQuestProgress" DROP COLUMN "currentQuestionIndex",
ADD COLUMN     "currentTaskIndex" INTEGER NOT NULL DEFAULT 0;
