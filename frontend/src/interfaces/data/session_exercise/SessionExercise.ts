import { Exercise } from "../exercise/Exercise";
import { SetExercise } from "../set/Set";

export interface SessionExercise {
    id: number;
    load: number;
    rest_between_exercises: number;
    validated: boolean;
    comment?: string;
}

export type SessionExerciseWithExerciseAndSets = SessionExercise & { exercise: Exercise, set: SetExercise[] }