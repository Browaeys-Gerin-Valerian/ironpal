import { Exercise } from "./Exercise";
import { Set } from "./Set";


export interface SessionExercise {
    id: number;
    load: number;
    rest_between_exercises: number;
    validated: boolean;
    comment?: string;
}

export type SessionExerciseWithExerciseAndSets = SessionExercise & { exercise: Exercise, sets: Set[] }