import { Series } from "../../Series";

export interface ExerciseData {
    exerciseName: string;
    series: Series[];
    weight: number | undefined;
    restTime: string | undefined;
    restTimeFinal: string | undefined; 
}
