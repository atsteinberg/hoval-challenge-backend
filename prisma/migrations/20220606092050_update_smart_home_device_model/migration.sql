/*
  Warnings:

  - You are about to drop the column `targetTemperature` on the `SmartHomeDevice` table. All the data in the column will be lost.
  - You are about to drop the column `changeId` on the `StatusChange` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `StatusChange` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `StatusChange` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('Day', 'Night');

-- DropIndex
DROP INDEX "StatusChange_changeId_key";

-- AlterTable
ALTER TABLE "SmartHomeDevice" DROP COLUMN "targetTemperature";

-- AlterTable
ALTER TABLE "StatusChange" DROP COLUMN "changeId",
ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL;

-- CreateTable
CREATE TABLE "TargetTemperatureEntry" (
    "id" TEXT NOT NULL,
    "days" "Day"[],
    "from" TIMESTAMP(3),
    "to" TIMESTAMP(3),
    "timeOfDay" "TimeOfDay"[],
    "targetTemperature" DOUBLE PRECISION NOT NULL,
    "smartHomeDeviceId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "TargetTemperatureEntry_id_key" ON "TargetTemperatureEntry"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StatusChange_id_key" ON "StatusChange"("id");

-- AddForeignKey
ALTER TABLE "TargetTemperatureEntry" ADD CONSTRAINT "TargetTemperatureEntry_smartHomeDeviceId_fkey" FOREIGN KEY ("smartHomeDeviceId") REFERENCES "SmartHomeDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
