/*
  Warnings:

  - You are about to drop the `_UserAnswerOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserAnswerOptions" DROP CONSTRAINT "_UserAnswerOptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserAnswerOptions" DROP CONSTRAINT "_UserAnswerOptions_B_fkey";

-- DropTable
DROP TABLE "_UserAnswerOptions";

-- CreateTable
CREATE TABLE "user_answer_options" (
    "userAnswerId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "user_answer_options_pkey" PRIMARY KEY ("userAnswerId","optionId")
);

-- AddForeignKey
ALTER TABLE "user_answer_options" ADD CONSTRAINT "user_answer_options_userAnswerId_fkey" FOREIGN KEY ("userAnswerId") REFERENCES "user_answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answer_options" ADD CONSTRAINT "user_answer_options_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
