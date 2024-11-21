/*
  Warnings:

  - Added the required column `eventDate` to the `Boda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boda" ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL;
