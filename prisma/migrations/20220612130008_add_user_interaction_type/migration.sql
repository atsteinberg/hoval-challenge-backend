-- CreateEnum
CREATE TYPE "UserInteractionType" AS ENUM ('NameChange', 'TargetTemperatureChange');

-- CreateTable
CREATE TABLE "UserInteraction" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interactionType" "UserInteractionType" NOT NULL,
    "message" TEXT NOT NULL,
    "smartHomeDeviceId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInteraction_id_key" ON "UserInteraction"("id");

-- AddForeignKey
ALTER TABLE "UserInteraction" ADD CONSTRAINT "UserInteraction_smartHomeDeviceId_fkey" FOREIGN KEY ("smartHomeDeviceId") REFERENCES "SmartHomeDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
