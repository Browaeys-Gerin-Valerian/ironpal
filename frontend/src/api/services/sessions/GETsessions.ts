import axios from "axios";

const GETsessions = async (userId: number, month: number, year: number) => {
    try {
        const response = await axios.get(`/users/${userId}/sessions?month=${month}&year=${year}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching session:", error);
        throw error.response?.data || error.message;
    }
};
export default GETsessions;
