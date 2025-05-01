/*
  Warnings:

  - You are about to drop the column `visibility` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "visibility";

-- DropEnum
DROP TYPE "Visibility";
