-- AlterTable
ALTER TABLE "quest_tasks" ADD COLUMN     "isFinalized" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "single_choice_tasks" ALTER COLUMN "correctOptionId" DROP NOT NULL;
