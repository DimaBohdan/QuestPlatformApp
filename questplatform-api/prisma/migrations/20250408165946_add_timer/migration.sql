/*
  Warnings:

  - You are about to drop the column `time` on the `Quest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "time";

-- AlterTable
ALTER TABLE "quest_tasks" ADD COLUMN     "time" INTEGER;
