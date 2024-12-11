import { SESSION } from "../../routes/routes.api";
import axios from "axios";

const GETsession = async (sessionId: string = '') => {
    try {
        const response = await axios.get(`${SESSION.GET}/${sessionId}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching session:", error);
        throw error.response?.data || error.message;
    }
};

export default GETsession;
