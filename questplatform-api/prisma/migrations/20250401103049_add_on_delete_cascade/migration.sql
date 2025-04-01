-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_themeId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestProgress" DROP CONSTRAINT "UserQuestProgress_currentTaskId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestProgress" DROP CONSTRAINT "UserQuestProgress_questId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestProgress" DROP CONSTRAINT "UserQuestProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "media_files" DROP CONSTRAINT "media_files_optionId_fkey";

-- DropForeignKey
ALTER TABLE "media_files" DROP CONSTRAINT "media_files_questId_fkey";

-- DropForeignKey
ALTER TABLE "media_files" DROP CONSTRAINT "media_files_taskId_fkey";

-- DropForeignKey
ALTER TABLE "plot_nodes" DROP CONSTRAINT "plot_nodes_taskId_fkey";

-- DropForeignKey
ALTER TABLE "plot_nodes" DROP CONSTRAINT "plot_nodes_taskStartId_fkey";

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "QuestTheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_nodes" ADD CONSTRAINT "plot_nodes_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_nodes" ADD CONSTRAINT "plot_nodes_taskStartId_fkey" FOREIGN KEY ("taskStartId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestProgress" ADD CONSTRAINT "UserQuestProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestProgress" ADD CONSTRAINT "UserQuestProgress_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestProgress" ADD CONSTRAINT "UserQuestProgress_currentTaskId_fkey" FOREIGN KEY ("currentTaskId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
