-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "age" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "session_date" TIMESTAMP(3) NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "muscle_group_id" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionExercise" (
    "id" SERIAL NOT NULL,
    "load" DECIMAL(65,30) NOT NULL,
    "rest_between_exercises" INTEGER NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "session_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "SessionExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "number_of_repetitions" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "rest_between_sets" INTEGER NOT NULL,
    "session_exercise_id" INTEGER NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseMuscleGroup" (
    "id" SERIAL NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "muscle_group_id" INTEGER NOT NULL,

    CONSTRAINT "ExerciseMuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionExercise" ADD CONSTRAINT "SessionExercise_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionExercise" ADD CONSTRAINT "SessionExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_session_exercise_id_fkey" FOREIGN KEY ("session_exercise_id") REFERENCES "SessionExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
