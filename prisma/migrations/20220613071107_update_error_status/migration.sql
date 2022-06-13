/*
  Warnings:

  - The values [Active,Checked,Resolved] on the enum `ErrorStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ErrorStatus_new" AS ENUM ('Unread', 'Read', 'Acknowledged');
ALTER TABLE "DeviceError" ALTER COLUMN "status" TYPE "ErrorStatus_new" USING ("status"::text::"ErrorStatus_new");
ALTER TYPE "ErrorStatus" RENAME TO "ErrorStatus_old";
ALTER TYPE "ErrorStatus_new" RENAME TO "ErrorStatus";
DROP TYPE "ErrorStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "DeviceError" ALTER COLUMN "status" SET DEFAULT E'Unread';
