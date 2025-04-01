-- CreateTable
CREATE TABLE "QuestView" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "userId" TEXT,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestView_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestView" ADD CONSTRAINT "QuestView_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
