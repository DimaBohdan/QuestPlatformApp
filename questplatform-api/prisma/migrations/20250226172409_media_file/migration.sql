/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `media_files` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "media_files" ADD COLUMN     "public_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "media_files_public_id_key" ON "media_files"("public_id");
