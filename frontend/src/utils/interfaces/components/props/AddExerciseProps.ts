import { ExerciseData } from "../data/ExerciceData";

export interface AddExerciseProps {
    open: boolean;
    onClose: () => void;
    onSave: (exerciseData: ExerciseData) => void;
    initialData: ExerciseData | null;
}
  