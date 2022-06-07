/*
  Warnings:

  - The `days` column on the `TargetTemperatureEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- AlterTable
ALTER TABLE "TargetTemperatureEntry" DROP COLUMN "days",
ADD COLUMN     "days" "WeekDay"[];

-- DropEnum
DROP TYPE "Day";
