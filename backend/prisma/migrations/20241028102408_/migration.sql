/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExerciseMuscleGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MuscleGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Set` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_muscle_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_muscle_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SessionExercise" DROP CONSTRAINT "SessionExercise_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "SessionExercise" DROP CONSTRAINT "SessionExercise_session_id_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_session_exercise_id_fkey";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "ExerciseMuscleGroup";

-- DropTable
DROP TABLE "MuscleGroup";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "SessionExercise";

-- DropTable
DROP TABLE "Set";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "age" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "session_date" TIMESTAMP(3) NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "muscle_group_id" INTEGER NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessionExercise" (
    "id" SERIAL NOT NULL,
    "load" DECIMAL(65,30) NOT NULL,
    "rest_between_exercises" INTEGER NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT,
    "session_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "sessionExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "set" (
    "id" SERIAL NOT NULL,
    "number_of_repetitions" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "rest_between_sets" INTEGER NOT NULL,
    "session_exercise_id" INTEGER NOT NULL,

    CONSTRAINT "set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exerciseMuscleGroup" (
    "id" SERIAL NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "muscle_group_id" INTEGER NOT NULL,

    CONSTRAINT "exerciseMuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscleGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "muscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessionExercise" ADD CONSTRAINT "sessionExercise_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessionExercise" ADD CONSTRAINT "sessionExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "set" ADD CONSTRAINT "set_session_exercise_id_fkey" FOREIGN KEY ("session_exercise_id") REFERENCES "sessionExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exerciseMuscleGroup" ADD CONSTRAINT "exerciseMuscleGroup_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exerciseMuscleGroup" ADD CONSTRAINT "exerciseMuscleGroup_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
