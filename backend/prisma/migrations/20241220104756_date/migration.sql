/*
  Warnings:

  - You are about to drop the column `createdat` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `sessionExercise` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `sessionExercise` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sessionExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sessionExercise" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
