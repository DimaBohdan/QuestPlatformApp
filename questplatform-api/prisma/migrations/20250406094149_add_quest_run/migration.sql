/*
  Warnings:

  - You are about to drop the column `description` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `questId` on the `UserQuestProgress` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_answers` table. All the data in the column will be lost.
  - You are about to drop the `AchievementCondition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `condition` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runId` to the `UserQuestProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progressId` to the `user_answers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestRunMode" AS ENUM ('SINGLE_PLAYER', 'MULTIPLAYER');

-- DropForeignKey
ALTER TABLE "AchievementCondition" DROP CONSTRAINT "AchievementCondition_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestProgress" DROP CONSTRAINT "UserQuestProgress_questId_fkey";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "condition" JSONB NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserQuestProgress" DROP COLUMN "questId",
ADD COLUMN     "runId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_answers" DROP COLUMN "userId",
ADD COLUMN     "progressId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AchievementCondition";

-- CreateTable
CREATE TABLE "QuestRun" (
    "id" TEXT NOT NULL,
    "mode" "QuestRunMode" NOT NULL,
    "questId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "sessionCode" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "QuestRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestRun_sessionCode_key" ON "QuestRun"("sessionCode");

-- AddForeignKey
ALTER TABLE "QuestRun" ADD CONSTRAINT "QuestRun_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRun" ADD CONSTRAINT "QuestRun_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestProgress" ADD CONSTRAINT "UserQuestProgress_runId_fkey" FOREIGN KEY ("runId") REFERENCES "QuestRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "UserQuestProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
