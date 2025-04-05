/*
  Warnings:

  - You are about to drop the column `startNodeId` on the `quest_tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "plot_nodes" ADD COLUMN     "isFinal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "quest_tasks" DROP COLUMN "startNodeId";
