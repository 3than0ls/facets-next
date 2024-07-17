/*
  Warnings:

  - You are about to alter the column `text` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "text" SET DATA TYPE VARCHAR(500);
