import { SessionExerciseData } from "../data/exercise/SessionExerciseData";
import { ExerciseOrigin } from "../data/exercise/ExerciseOrigin";

export interface AddExerciseProps {
    open: boolean;
    onClose: () => void;
    onSave: (SessionExerciseData: SessionExerciseData) => void;
    initialData: SessionExerciseData | null;
    exercises: ExerciseOrigin[];
};
