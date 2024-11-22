import { MuscleGroup } from "../muscle_group/MuscleGroup";
import { SessionExerciseWithExerciseAndSets } from "../session_exercise/SessionExercise";

export interface Session {
    id: number;
    title: string;
    session_date: Date;
    validated: boolean;
}

export type SessionWithMuscleGroupAndSessionExercises = Session & { muscle_group: MuscleGroup, session_exercise: SessionExerciseWithExerciseAndSets[] }