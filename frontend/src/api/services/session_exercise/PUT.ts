
import axios from "axios";


interface UpdateSessionExercise {
    exercise_id: number,
    load: number,
    rest_between_exercises: string,
    sets: {
        rest_between_sets: string;
        number_of_repetitions: number;
    }[]
}

export const PUTsessionExercise = async (sessionId: number, sessionExerciseId: number, payload: UpdateSessionExercise) => {
    try {
        const response = await axios.put(`/session/${sessionId}/sessionExercises/${sessionExerciseId}`, payload);
        return response;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};
