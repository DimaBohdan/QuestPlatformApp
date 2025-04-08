/*
  Warnings:

  - You are about to drop the column `type` on the `AchievementCondition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AchievementCondition" DROP COLUMN "type";

-- DropEnum
DROP TYPE "AchievementType";
