
import axios from "axios";
import { SESSION_EXERCISE } from "../../routes/routes.api";

interface UpdateSessionExercise {
    session_id: number,
    exercise_id: number,
    load: number,
    rest_between_exercises: string,
    sets: {
        rest_between_sets: string;
        number_of_repetitions: number;
    }[]
}

export const UPDATEsessionExercise = async (id: number, payload: UpdateSessionExercise) => {
    try {
        const response = await axios.put(`${SESSION_EXERCISE.UPDATE}/${id}`, payload);
        return response;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};
