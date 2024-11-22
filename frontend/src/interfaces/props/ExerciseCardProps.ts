import { SessionExerciseWithExerciseAndSets } from "../data/session_exercise/SessionExercise";



export interface ExerciseCardProps {
    exercise: SessionExerciseWithExerciseAndSets;
    onEditExercise: (exercise: SessionExerciseWithExerciseAndSets) => void;
    onDeleteExercise: (exercise: SessionExerciseWithExerciseAndSets) => void;
}