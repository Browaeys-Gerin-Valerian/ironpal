-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_muscle_group_id_fkey";

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "muscle_group_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
