/*
  Warnings:

  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userid` on the `Todo` table. All the data in the column will be lost.
  - The required column `uid` was added to the `Todo` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_pkey",
DROP COLUMN "userid",
ADD COLUMN     "uid" TEXT NOT NULL,
ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("uid");