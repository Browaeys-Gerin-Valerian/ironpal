import axios from "axios";


export const getExercises = async () => {
    try {
        const response = await axios.get('/exercises');
        return response.data;
    } catch (error: any) {
        console.error("Error fetching exercises:", error);
        throw error.response?.data || error.message;
    }
};

