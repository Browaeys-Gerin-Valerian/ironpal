import { ExerciseData } from "../data/exercise/ExerciseData";
import { ExerciseOrigin } from "../data/exercise/ExerciseOrigin";

export interface AddExerciseProps {
    open: boolean;
    onClose: () => void;
    onSave: (exerciseData: ExerciseData) => void;
    initialData: ExerciseData | null;
    exercises:  ExerciseOrigin[];
};
  