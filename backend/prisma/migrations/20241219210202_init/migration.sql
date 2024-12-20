/*
  Warnings:

  - You are about to drop the column `createdAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sessionExercise` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sessionExercise` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedat` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `sessionExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sessionExercise" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;
