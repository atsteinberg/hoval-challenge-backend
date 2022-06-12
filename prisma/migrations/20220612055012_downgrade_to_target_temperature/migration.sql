/*
  Warnings:

  - You are about to drop the `TargetTemperatureEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `targetTemperature` to the `SmartHomeDevice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TargetTemperatureEntry" DROP CONSTRAINT "TargetTemperatureEntry_smartHomeDeviceId_fkey";

-- AlterTable
ALTER TABLE "SmartHomeDevice" ADD COLUMN     "targetTemperature" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "TargetTemperatureEntry";

-- DropEnum
DROP TYPE "TimeOfDay";

-- DropEnum
DROP TYPE "WeekDay";
