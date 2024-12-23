import axios from "axios";
import { CreateSessionExerciseDTO, UpdateSessionExerciseDTO } from "../../interfaces/DTO/sessionExercises";




export const createSessionExercise = async (sessionId: number, payload: CreateSessionExerciseDTO) => {
    try {
        const response = await axios.post(`/sessions/${sessionId}/sessionExercises`, payload);
        return response;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};


export const updateSessionExercise = async (sessionId: number, sessionExerciseId: number, payload: UpdateSessionExerciseDTO) => {
    try {
        const response = await axios.put(`/sessions/${sessionId}/sessionExercises/${sessionExerciseId}`, payload);
        return response;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};


export const deleteSessionExercise = async (sessionId: number, sessionExerciseId: number) => {
    try {
        const response = await axios.delete(`sessions/${sessionId}/sessionExercises/${sessionExerciseId}`);
        return response;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};
