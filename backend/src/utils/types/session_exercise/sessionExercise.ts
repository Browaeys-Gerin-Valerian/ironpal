import { SessionExercise } from "@prisma/client";

export type CreateSessionExerciseDTO = Omit<SessionExercise, 'id' | 'created_at' | 'updated_at'>
export type UpdateSessionExerciseDTO = Partial<SessionExercise>

