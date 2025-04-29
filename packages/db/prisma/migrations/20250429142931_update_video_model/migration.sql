/*
  Warnings:

  - You are about to drop the column `uploaderId` on the `Video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_uploaderId_fkey";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "uploaderId",
ALTER COLUMN "thumbnailUrl" SET DEFAULT '',
ALTER COLUMN "videoUrl" SET DEFAULT '';

-- CreateTable
CREATE TABLE "_VideoCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VideoCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VideoCategories_B_index" ON "_VideoCategories"("B");

-- AddForeignKey
ALTER TABLE "_VideoCategories" ADD CONSTRAINT "_VideoCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoCategories" ADD CONSTRAINT "_VideoCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
