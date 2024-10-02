/*
  Warnings:

  - The `Deposito` column on the `Invitados` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Invitados" DROP COLUMN "Deposito",
ADD COLUMN     "Deposito" BOOLEAN NOT NULL DEFAULT false;
