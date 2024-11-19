import { User } from "@prisma/client"
import { Request } from 'express';

export type ReqWithUser = Request & {
  user?: Omit<User, "password">
}

type SessionExercise = {
  id: number | null
  load: number
  rest_between_exercises: number
  validated: boolean
  comment: string | null
  exercise: {
    id: number
  };
  sets?: Array<{
    id?: number
    number_of_repetitions: number;
    difficulty: number;
    rest_between_sets: number;
    session_exercise_id?: number;
  }>;
};

export type SessionExerciseData = {
  title: string;
  sessionExercises: SessionExercise[];
};