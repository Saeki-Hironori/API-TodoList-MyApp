/*
  Warnings:

  - You are about to drop the column `updataedAt` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "updataedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
