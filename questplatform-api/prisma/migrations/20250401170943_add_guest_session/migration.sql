/*
  Warnings:

  - A unique constraint covering the columns `[guestSessionId,questId]` on the table `QuestView` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,questId]` on the table `QuestView` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "QuestView" ADD COLUMN     "guestSessionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "QuestView_guestSessionId_questId_key" ON "QuestView"("guestSessionId", "questId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestView_userId_questId_key" ON "QuestView"("userId", "questId");

-- AddForeignKey
ALTER TABLE "QuestView" ADD CONSTRAINT "QuestView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
