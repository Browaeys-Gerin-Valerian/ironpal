import axios from "axios";
import { SESSION_EXERCISE } from "../../routes/routes.api";


export const DELETEsessionExercise = async (id: number) => {
    try {
        const response = await axios.delete(`${SESSION_EXERCISE.DELETE}/${id}`);
        return response;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};
