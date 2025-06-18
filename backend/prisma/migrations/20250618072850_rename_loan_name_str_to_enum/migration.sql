/*
  Warnings:

  - Changed the type of `status` on the `LoanApplication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED', 'DISBURSED', 'CANCELLED');

-- AlterTable
ALTER TABLE "LoanApplication" DROP COLUMN "status",
ADD COLUMN     "status" "LoanStatus" NOT NULL;
