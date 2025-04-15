/*
  Warnings:

  - You are about to drop the `user_answer_options` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_answer_options" DROP CONSTRAINT "user_answer_options_optionId_fkey";

-- DropForeignKey
ALTER TABLE "user_answer_options" DROP CONSTRAINT "user_answer_options_userAnswerId_fkey";

-- DropTable
DROP TABLE "user_answer_options";

-- CreateTable
CREATE TABLE "_UserAnswerOptions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserAnswerOptions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserAnswerOptions_B_index" ON "_UserAnswerOptions"("B");

-- AddForeignKey
ALTER TABLE "_UserAnswerOptions" ADD CONSTRAINT "_UserAnswerOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAnswerOptions" ADD CONSTRAINT "_UserAnswerOptions_B_fkey" FOREIGN KEY ("B") REFERENCES "user_answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
