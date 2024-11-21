import { SessionExerciseData } from "../data/session/SessionExerciseData";


export interface ExerciseCardProps {
    exercise: SessionExerciseData;
    onEditExercise: (exercise: SessionExerciseData) => void;
    onDeleteExercise: (exercise: SessionExerciseData) => void;
}