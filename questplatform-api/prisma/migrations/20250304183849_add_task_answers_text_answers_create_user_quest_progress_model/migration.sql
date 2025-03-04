/*
  Warnings:

  - You are about to drop the column `answerIds` on the `quest_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `textAnswer` on the `quest_tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_taskId_fkey";

-- AlterTable
ALTER TABLE "quest_tasks" DROP COLUMN "answerIds",
DROP COLUMN "textAnswer",
ADD COLUMN     "textAnswers" TEXT[];

-- CreateTable
CREATE TABLE "UserQuestProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "currentTaskId" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserQuestProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserQuestProgress" ADD CONSTRAINT "UserQuestProgress_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestProgress" ADD CONSTRAINT "UserQuestProgress_currentTaskId_fkey" FOREIGN KEY ("currentTaskId") REFERENCES "quest_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_TaskId_FK" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_AnswerTaskId_FK" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
