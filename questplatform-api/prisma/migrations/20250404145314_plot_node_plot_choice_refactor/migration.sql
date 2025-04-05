/*
  Warnings:

  - You are about to drop the column `isFinal` on the `plot_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `taskStartId` on the `plot_nodes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "plot_nodes" DROP CONSTRAINT "plot_nodes_taskStartId_fkey";

-- DropIndex
DROP INDEX "plot_choices_nextNodeId_key";

-- DropIndex
DROP INDEX "plot_nodes_taskStartId_key";

-- AlterTable
ALTER TABLE "plot_nodes" DROP COLUMN "isFinal",
DROP COLUMN "taskStartId",
ADD COLUMN     "isStart" BOOLEAN NOT NULL DEFAULT false;
