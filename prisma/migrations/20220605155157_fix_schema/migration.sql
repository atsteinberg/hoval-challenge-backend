/*
  Warnings:

  - You are about to drop the column `errorId` on the `DeviceError` table. All the data in the column will be lost.
  - You are about to drop the column `smartHomeDeviceDeviceId` on the `DeviceError` table. All the data in the column will be lost.
  - You are about to drop the column `desiredTemperature` on the `SmartHomeDevice` table. All the data in the column will be lost.
  - You are about to drop the column `deviceErrorErrorId` on the `SmartHomeDevice` table. All the data in the column will be lost.
  - You are about to drop the column `ownerUserId` on the `SmartHomeDevice` table. All the data in the column will be lost.
  - You are about to drop the column `smartHomeDeviceDeviceId` on the `StatusChange` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `DeviceError` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `DeviceError` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `status` on the `DeviceError` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `targetTemperature` to the `SmartHomeDevice` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "SmartHomeDevice" DROP CONSTRAINT "SmartHomeDevice_ownerUserId_fkey";

-- DropIndex
DROP INDEX "DeviceError_errorId_key";

-- DropIndex
DROP INDEX "SmartHomeDevice_deviceErrorErrorId_key";

-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
ALTER TABLE "DeviceError" DROP COLUMN "errorId",
DROP COLUMN "smartHomeDeviceDeviceId",
ADD COLUMN     "id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ErrorStatus" NOT NULL;

-- AlterTable
ALTER TABLE "SmartHomeDevice" DROP COLUMN "desiredTemperature",
DROP COLUMN "deviceErrorErrorId",
DROP COLUMN "ownerUserId",
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "targetTemperature" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "StatusChange" DROP COLUMN "smartHomeDeviceDeviceId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DeviceError_id_key" ON "DeviceError"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "SmartHomeDevice" ADD CONSTRAINT "SmartHomeDevice_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
