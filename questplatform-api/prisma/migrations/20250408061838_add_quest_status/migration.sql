/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `currentTaskId` on the `UserQuestProgress` table. All the data in the column will be lost.
  - Added the required column `quest_status` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestStatus" AS ENUM ('DRAFT', 'READY', 'PUBLISHED');

-- DropForeignKey
ALTER TABLE "UserQuestProgress" DROP CONSTRAINT "UserQuestProgress_currentTaskId_fkey";

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "isPublic",
ADD COLUMN     "quest_status" "QuestStatus" NOT NULL;

-- AlterTable
ALTER TABLE "UserQuestProgress" DROP COLUMN "currentTaskId",
ADD COLUMN     "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0;
