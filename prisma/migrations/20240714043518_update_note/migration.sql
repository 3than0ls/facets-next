/*
  Warnings:

  - Added the required column `positionX` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionY` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('CYAN', 'ORANGE', 'YELLOW', 'GREEN', 'RED');

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "color" "Color" NOT NULL DEFAULT 'YELLOW',
ADD COLUMN     "positionX" INTEGER NOT NULL,
ADD COLUMN     "positionY" INTEGER NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
