/*
  Warnings:

  - The values [PLOT] on the enum `QuestTaskType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `taskId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `choices` on the `quest_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `quest_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `radius` on the `quest_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `targetX` on the `quest_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `targetY` on the `quest_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `textAnswers` on the `quest_tasks` table. All the data in the column will be lost.
  - You are about to drop the `UserAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestTaskType_new" AS ENUM ('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TEXT_FIELD', 'FIND_ON_PICTURE', 'FIND_ON_MAP', 'CHESSBOARD', 'INTERACTIVE_PLOT');
ALTER TABLE "quest_tasks" ALTER COLUMN "type" TYPE "QuestTaskType_new" USING ("type"::text::"QuestTaskType_new");
ALTER TYPE "QuestTaskType" RENAME TO "QuestTaskType_old";
ALTER TYPE "QuestTaskType_new" RENAME TO "QuestTaskType";
DROP TYPE "QuestTaskType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_AnswerTaskId_FKey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_TaskId_FKey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_taskId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "taskId",
ADD COLUMN     "multipleChoiceTaskId" TEXT,
ADD COLUMN     "singleChoiceTaskId" TEXT;

-- AlterTable
ALTER TABLE "quest_tasks" DROP COLUMN "choices",
DROP COLUMN "content",
DROP COLUMN "radius",
DROP COLUMN "targetX",
DROP COLUMN "targetY",
DROP COLUMN "textAnswers";

-- DropTable
DROP TABLE "UserAnswer";

-- CreateTable
CREATE TABLE "single_choice_tasks" (
    "quest_task_id" TEXT NOT NULL,
    "correctOptionId" TEXT NOT NULL,

    CONSTRAINT "single_choice_tasks_pkey" PRIMARY KEY ("quest_task_id")
);

-- CreateTable
CREATE TABLE "multiple_choice_tasks" (
    "quest_task_id" TEXT NOT NULL,

    CONSTRAINT "multiple_choice_tasks_pkey" PRIMARY KEY ("quest_task_id")
);

-- CreateTable
CREATE TABLE "text_field_tasks" (
    "quest_task_id" TEXT NOT NULL,
    "correctText" TEXT[],

    CONSTRAINT "text_field_tasks_pkey" PRIMARY KEY ("quest_task_id")
);

-- CreateTable
CREATE TABLE "find_on_picture_tasks" (
    "quest_task_id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "correctCoordinateId" TEXT NOT NULL,

    CONSTRAINT "find_on_picture_tasks_pkey" PRIMARY KEY ("quest_task_id")
);

-- CreateTable
CREATE TABLE "find_on_map_tasks" (
    "quest_task_id" TEXT NOT NULL,
    "correctCoordinateId" TEXT NOT NULL,

    CONSTRAINT "find_on_map_tasks_pkey" PRIMARY KEY ("quest_task_id")
);

-- CreateTable
CREATE TABLE "plot_tasks" (
    "quest_task_id" TEXT NOT NULL,
    "startNodeId" TEXT NOT NULL,

    CONSTRAINT "plot_tasks_pkey" PRIMARY KEY ("quest_task_id")
);

-- CreateTable
CREATE TABLE "plot_nodes" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "plot_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plot_choices" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "nextNodeId" TEXT,

    CONSTRAINT "plot_choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinates" (
    "id" TEXT NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "findOnMapTaskId" TEXT,

    CONSTRAINT "coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_answers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "textAnswer" TEXT,
    "selectedCoordsId" TEXT,
    "plotChoiceId" TEXT,

    CONSTRAINT "user_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MultipleChoiceTask_CorrectOptions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MultipleChoiceTask_CorrectOptions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserAnswerOptions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserAnswerOptions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "single_choice_tasks_correctOptionId_key" ON "single_choice_tasks"("correctOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "find_on_picture_tasks_imageId_key" ON "find_on_picture_tasks"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "find_on_picture_tasks_correctCoordinateId_key" ON "find_on_picture_tasks"("correctCoordinateId");

-- CreateIndex
CREATE UNIQUE INDEX "find_on_map_tasks_correctCoordinateId_key" ON "find_on_map_tasks"("correctCoordinateId");

-- CreateIndex
CREATE UNIQUE INDEX "plot_tasks_startNodeId_key" ON "plot_tasks"("startNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "plot_choices_nextNodeId_key" ON "plot_choices"("nextNodeId");

-- CreateIndex
CREATE INDEX "_MultipleChoiceTask_CorrectOptions_B_index" ON "_MultipleChoiceTask_CorrectOptions"("B");

-- CreateIndex
CREATE INDEX "_UserAnswerOptions_B_index" ON "_UserAnswerOptions"("B");

-- AddForeignKey
ALTER TABLE "single_choice_tasks" ADD CONSTRAINT "single_choice_tasks_quest_task_id_fkey" FOREIGN KEY ("quest_task_id") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "single_choice_tasks" ADD CONSTRAINT "single_choice_tasks_correctOptionId_fkey" FOREIGN KEY ("correctOptionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multiple_choice_tasks" ADD CONSTRAINT "multiple_choice_tasks_quest_task_id_fkey" FOREIGN KEY ("quest_task_id") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_field_tasks" ADD CONSTRAINT "text_field_tasks_quest_task_id_fkey" FOREIGN KEY ("quest_task_id") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "find_on_picture_tasks" ADD CONSTRAINT "find_on_picture_tasks_task_fkey" FOREIGN KEY ("quest_task_id") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "find_on_picture_tasks" ADD CONSTRAINT "find_on_picture_tasks_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "find_on_picture_tasks" ADD CONSTRAINT "find_on_picture_tasks_coordinate_fkey" FOREIGN KEY ("correctCoordinateId") REFERENCES "coordinates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "find_on_map_tasks" ADD CONSTRAINT "find_on_map_tasks_quest_task_id_fkey" FOREIGN KEY ("quest_task_id") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "find_on_map_tasks" ADD CONSTRAINT "find_on_map_tasks_correctCoordinateId_fkey" FOREIGN KEY ("correctCoordinateId") REFERENCES "coordinates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_tasks" ADD CONSTRAINT "plot_tasks_quest_task_id_fkey" FOREIGN KEY ("quest_task_id") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_tasks" ADD CONSTRAINT "plot_tasks_startNodeId_fkey" FOREIGN KEY ("startNodeId") REFERENCES "plot_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_nodes" ADD CONSTRAINT "plot_nodes_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "plot_tasks"("quest_task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_choices" ADD CONSTRAINT "plot_choices_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "plot_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_choices" ADD CONSTRAINT "plot_choices_nextNodeId_fkey" FOREIGN KEY ("nextNodeId") REFERENCES "plot_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinates" ADD CONSTRAINT "coordinates_findOnMapTaskId_fkey" FOREIGN KEY ("findOnMapTaskId") REFERENCES "find_on_map_tasks"("quest_task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_singleChoiceTaskId_fkey" FOREIGN KEY ("singleChoiceTaskId") REFERENCES "single_choice_tasks"("quest_task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_multipleChoiceTaskId_fkey" FOREIGN KEY ("multipleChoiceTaskId") REFERENCES "multiple_choice_tasks"("quest_task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_selectedCoordsId_fkey" FOREIGN KEY ("selectedCoordsId") REFERENCES "coordinates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_plotChoiceId_fkey" FOREIGN KEY ("plotChoiceId") REFERENCES "plot_choices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MultipleChoiceTask_CorrectOptions" ADD CONSTRAINT "_MultipleChoiceTask_CorrectOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "multiple_choice_tasks"("quest_task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MultipleChoiceTask_CorrectOptions" ADD CONSTRAINT "_MultipleChoiceTask_CorrectOptions_B_fkey" FOREIGN KEY ("B") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAnswerOptions" ADD CONSTRAINT "_UserAnswerOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAnswerOptions" ADD CONSTRAINT "_UserAnswerOptions_B_fkey" FOREIGN KEY ("B") REFERENCES "user_answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
