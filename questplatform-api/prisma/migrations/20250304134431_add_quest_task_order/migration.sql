/*
  Warnings:

  - A unique constraint covering the columns `[questId,order]` on the table `quest_tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `quest_tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quest_tasks" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "quest_tasks_questId_order_key" ON "quest_tasks"("questId", "order");
