/*
  Warnings:

  - You are about to drop the column `condition` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Achievement` table. All the data in the column will be lost.
  - Added the required column `description` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('COMPLETE_QUEST', 'CREATE_PUBLIC_QUESTS', 'MAKE_FRIENDS');

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "condition",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AchievementCondition" (
    "id" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "type" "AchievementType" NOT NULL,
    "completedQuestsQuantity" INTEGER,
    "createdQuestsQuantity" INTEGER,
    "friendsQuantity" INTEGER,

    CONSTRAINT "AchievementCondition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AchievementCondition" ADD CONSTRAINT "AchievementCondition_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
