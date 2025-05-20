/*
  Warnings:

  - You are about to drop the column `views` on the `Video` table. All the data in the column will be lost.
  - Made the column `userId` on table `ViewEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "views";

-- AlterTable
ALTER TABLE "ViewEvent" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ViewEvent" ADD CONSTRAINT "ViewEvent_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
