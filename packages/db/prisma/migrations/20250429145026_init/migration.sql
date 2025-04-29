/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "categoryId",
DROP COLUMN "videoUrl";
