import { Series } from "../../Series";

export interface SessionExerciseData {
    exerciseName: string;
    sets: Series[];
    load: number | undefined;
    restBetweenSets: string | undefined;
    restBetweenExercises: string | undefined;
}
