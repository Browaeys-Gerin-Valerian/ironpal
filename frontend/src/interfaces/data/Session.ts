import { SessionExerciseWithExerciseAndSets } from "./SessionExercise";

export interface Session {
    id: number;
    title: string;
    session_date: string;
}

export type SessionWithExercises = Session & { exercises: string[] };

export type SessionWithSessionExercises = Session & { session_exercise: SessionExerciseWithExerciseAndSets[] }