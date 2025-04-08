/*
  Warnings:

  - You are about to drop the column `isActive` on the `QuestRun` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QuestRunStatus" AS ENUM ('INACTIVE', 'STARTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "QuestRun" DROP COLUMN "isActive",
ADD COLUMN     "status" "QuestRunStatus" NOT NULL DEFAULT 'INACTIVE';
