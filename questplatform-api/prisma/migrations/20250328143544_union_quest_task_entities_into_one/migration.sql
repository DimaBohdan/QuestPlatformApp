/*
  Warnings:

  - You are about to drop the column `multipleChoiceTaskId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `singleChoiceTaskId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `findOnMapTaskId` on the `coordinates` table. All the data in the column will be lost.
  - You are about to drop the `_MultipleChoiceTask_CorrectOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `find_on_map_tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `find_on_picture_tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `multiple_choice_tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plot_tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `single_choice_tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `text_field_tasks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[findOnTaskId]` on the table `coordinates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskStartId]` on the table `plot_nodes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_multipleChoiceTaskId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_singleChoiceTaskId_fkey";

-- DropForeignKey
ALTER TABLE "_MultipleChoiceTask_CorrectOptions" DROP CONSTRAINT "_MultipleChoiceTask_CorrectOptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_MultipleChoiceTask_CorrectOptions" DROP CONSTRAINT "_MultipleChoiceTask_CorrectOptions_B_fkey";

-- DropForeignKey
ALTER TABLE "coordinates" DROP CONSTRAINT "coordinates_findOnMapTaskId_fkey";

-- DropForeignKey
ALTER TABLE "find_on_map_tasks" DROP CONSTRAINT "find_on_map_tasks_correctCoordinateId_fkey";

-- DropForeignKey
ALTER TABLE "find_on_map_tasks" DROP CONSTRAINT "find_on_map_tasks_quest_task_id_fkey";

-- DropForeignKey
ALTER TABLE "find_on_picture_tasks" DROP CONSTRAINT "find_on_picture_tasks_coordinate_fkey";

-- DropForeignKey
ALTER TABLE "find_on_picture_tasks" DROP CONSTRAINT "find_on_picture_tasks_imageId_fkey";

-- DropForeignKey
ALTER TABLE "find_on_picture_tasks" DROP CONSTRAINT "find_on_picture_tasks_task_fkey";

-- DropForeignKey
ALTER TABLE "multiple_choice_tasks" DROP CONSTRAINT "multiple_choice_tasks_quest_task_id_fkey";

-- DropForeignKey
ALTER TABLE "plot_nodes" DROP CONSTRAINT "plot_nodes_taskId_fkey";

-- DropForeignKey
ALTER TABLE "plot_tasks" DROP CONSTRAINT "plot_tasks_quest_task_id_fkey";

-- DropForeignKey
ALTER TABLE "plot_tasks" DROP CONSTRAINT "plot_tasks_startNodeId_fkey";

-- DropForeignKey
ALTER TABLE "single_choice_tasks" DROP CONSTRAINT "single_choice_tasks_correctOptionId_fkey";

-- DropForeignKey
ALTER TABLE "single_choice_tasks" DROP CONSTRAINT "single_choice_tasks_quest_task_id_fkey";

-- DropForeignKey
ALTER TABLE "text_field_tasks" DROP CONSTRAINT "text_field_tasks_quest_task_id_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "multipleChoiceTaskId",
DROP COLUMN "singleChoiceTaskId",
ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "coordinates" DROP COLUMN "findOnMapTaskId",
ADD COLUMN     "findOnTaskId" TEXT;

-- AlterTable
ALTER TABLE "plot_nodes" ADD COLUMN     "taskStartId" TEXT;

-- AlterTable
ALTER TABLE "quest_tasks" ADD COLUMN     "startNodeId" TEXT,
ADD COLUMN     "textAnswer" TEXT[];

-- DropTable
DROP TABLE "_MultipleChoiceTask_CorrectOptions";

-- DropTable
DROP TABLE "find_on_map_tasks";

-- DropTable
DROP TABLE "find_on_picture_tasks";

-- DropTable
DROP TABLE "multiple_choice_tasks";

-- DropTable
DROP TABLE "plot_tasks";

-- DropTable
DROP TABLE "single_choice_tasks";

-- DropTable
DROP TABLE "text_field_tasks";

-- CreateTable
CREATE TABLE "_QuestTaskCorrectAnswers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_QuestTaskCorrectAnswers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_QuestTaskCorrectAnswers_B_index" ON "_QuestTaskCorrectAnswers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "coordinates_findOnTaskId_key" ON "coordinates"("findOnTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "plot_nodes_taskStartId_key" ON "plot_nodes"("taskStartId");

-- AddForeignKey
ALTER TABLE "plot_nodes" ADD CONSTRAINT "plot_nodes_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_nodes" ADD CONSTRAINT "plot_nodes_taskStartId_fkey" FOREIGN KEY ("taskStartId") REFERENCES "quest_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinates" ADD CONSTRAINT "coordinates_findOnTaskId_fkey" FOREIGN KEY ("findOnTaskId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestProgress" ADD CONSTRAINT "UserQuestProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestTaskCorrectAnswers" ADD CONSTRAINT "_QuestTaskCorrectAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestTaskCorrectAnswers" ADD CONSTRAINT "_QuestTaskCorrectAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
