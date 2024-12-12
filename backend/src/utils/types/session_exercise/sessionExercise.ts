import { Set } from "@prisma/client";

export interface CreateExerciseSessionDTO {
    session_id: string;
    exercise_id: string;
    load: string;
    comment: string | null;
    rest_between_exercises: string;
    sets: Pick<Set, 'number_of_repetitions' | 'rest_between_sets'>;
}

export interface UpdatedExerciseSessionDTO {
    session_id: string;
    exercise_id: string;
    load: string;
    rest_between_exercises: string;
    validated: boolean,
    sets: Set;
}