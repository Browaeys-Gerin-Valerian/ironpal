import axios from "axios";



export const DELETEsessionExercise = async (sessionId: number, sessionExerciseId: number) => {
    try {
        const response = await axios.delete(`sessions/${sessionId}/sessionExercises/${sessionExerciseId}`);
        return response;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};
