-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- RenameForeignKey
ALTER TABLE "Option" RENAME CONSTRAINT "Option_AnswerTaskId_FK" TO "Option_TaskId_FK";

-- RenameForeignKey
ALTER TABLE "Option" RENAME CONSTRAINT "Option_TaskId_FK" TO "Option_AnswerTaskId_FK";

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "quest_tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
