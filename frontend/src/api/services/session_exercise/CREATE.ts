import axios from "axios";

interface CreateSessionExercise {
    exercise_id: number,
    load: number,
    rest_between_exercises: string,
    sets: {
        rest_between_sets: string;
        number_of_repetitions: number;
    }[]
}

export const CREATEsessionExercise = async (sessionId: number, payload: CreateSessionExercise) => {
    try {
        const response = await axios.post(`/sessions/${sessionId}/sessionExercises`, payload);
        return response;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};
