import { SessionExerciseWithExerciseAndSets } from "../session_exercise/SessionExercise";


//A revoir la session date den fonction du type renvoyé par le serveur
export interface Session {
    id: number;
    title: string;
    session_date: string;
    validated: boolean;
}


export type SessionWithExercises = Session & { exercises: string[] };

export type SessionWithSessionExercises = Session & { session_exercise: SessionExerciseWithExerciseAndSets[] }