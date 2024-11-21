
import { ExerciseOrigin } from "../data/exercise/ExerciseOrigin";
import { SessionExerciseData } from "../data/session/SessionExerciseData";

export interface AddExerciseProps {
    open: boolean;
    onClose: () => void;
    onSave: (SessionExerciseData: SessionExerciseData) => void;
    initialData: SessionExerciseData | null;
    exercises: ExerciseOrigin[];
};
