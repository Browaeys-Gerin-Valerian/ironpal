import { ExerciseData } from "../data/exercise/ExerciseData";

export interface ExerciseCardProps {
    exercise: ExerciseData;
    onEditExercise: (exercise: ExerciseData) => void;
    onDeleteExercise: (exercise: ExerciseData) => void;
}