/*
  Warnings:

  - You are about to drop the column `data` on the `UserInteraction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserInteraction" DROP COLUMN "data",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
