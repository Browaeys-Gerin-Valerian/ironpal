import { ExerciseData } from "../data/ExerciceData";

export interface ExerciseCardProps {
    exercise: ExerciseData;
    onEditExercise: (exercise: ExerciseData) => void;
    onDeleteExercise: (exercise: ExerciseData) => void;
}