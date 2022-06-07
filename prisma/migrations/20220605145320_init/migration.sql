-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('HeatingCircuit', 'CoolingCircuit');

-- CreateEnum
CREATE TYPE "ErrorStatus" AS ENUM ('Active', 'Checked', 'Resolved');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "hashedRt" TEXT,
    "oldRts" TEXT[]
);

-- CreateTable
CREATE TABLE "SmartHomeDevice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerUserId" TEXT,
    "type" "DeviceType" NOT NULL,
    "actualTemperature" DOUBLE PRECISION NOT NULL,
    "desiredTemperature" DOUBLE PRECISION NOT NULL,
    "deviceErrorErrorId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DeviceError" (
    "errorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "errorType" TEXT NOT NULL,
    "message" TEXT,
    "status" BOOLEAN NOT NULL,
    "smartHomeDeviceDeviceId" TEXT,
    "smartHomeDeviceId" TEXT
);

-- CreateTable
CREATE TABLE "StatusChange" (
    "changeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event" TEXT NOT NULL,
    "smartHomeDeviceDeviceId" TEXT,
    "smartHomeDeviceId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SmartHomeDevice_id_key" ON "SmartHomeDevice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SmartHomeDevice_deviceErrorErrorId_key" ON "SmartHomeDevice"("deviceErrorErrorId");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceError_errorId_key" ON "DeviceError"("errorId");

-- CreateIndex
CREATE UNIQUE INDEX "StatusChange_changeId_key" ON "StatusChange"("changeId");

-- AddForeignKey
ALTER TABLE "SmartHomeDevice" ADD CONSTRAINT "SmartHomeDevice_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceError" ADD CONSTRAINT "DeviceError_smartHomeDeviceId_fkey" FOREIGN KEY ("smartHomeDeviceId") REFERENCES "SmartHomeDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusChange" ADD CONSTRAINT "StatusChange_smartHomeDeviceId_fkey" FOREIGN KEY ("smartHomeDeviceId") REFERENCES "SmartHomeDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
