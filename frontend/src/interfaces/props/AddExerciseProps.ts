

import { Exercise } from "../data/exercise/Exercise";
import { SessionExerciseWithExerciseAndSets } from "../data/session_exercise/SessionExercise";


export interface AddExerciseProps {
    open: boolean;
    onClose: () => void;
    exercises: Exercise[];
    sessionExercise: SessionExerciseWithExerciseAndSets;
    setSessionExerciseToEdit: (sessionExeciseToEdit: SessionExerciseWithExerciseAndSets) => void
    handleAddSessionExercise: (createdSessionExercise: SessionExerciseWithExerciseAndSets) => void
    handleUpdateSessionExercise: (updatedSessionExercise: SessionExerciseWithExerciseAndSets) => void
};
