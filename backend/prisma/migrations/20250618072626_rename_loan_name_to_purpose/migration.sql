/*
  Warnings:

  - You are about to drop the column `name` on the `LoanApplication` table. All the data in the column will be lost.
  - Added the required column `purpose` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LoanPurpose" AS ENUM ('HOME_IMPROVEMENT', 'PERSONAL', 'OTHERS');

-- AlterTable
ALTER TABLE "LoanApplication" DROP COLUMN "name",
ADD COLUMN     "purpose" "LoanPurpose" NOT NULL;
