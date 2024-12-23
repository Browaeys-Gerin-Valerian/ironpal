import { SessionExercise } from "../SessionExercise";
import { Set } from "../Set";

export type CreateSessionExerciseDTO = Omit<SessionExercise, 'id'> & {
    exercise_id: number, sets: Omit<Set, 'id' | 'difficulty'>[]
}

export type UpdateSessionExerciseDTO = Partial<SessionExercise> & {
    exercise_id: number, sets: Partial<Set>[]
}