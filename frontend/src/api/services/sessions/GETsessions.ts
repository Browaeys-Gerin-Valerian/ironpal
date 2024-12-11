import { SESSION } from "../../routes/routes.api";
import axios from "axios";

const GETsessions = async () => {
    try {
        const response = await axios.get(`${SESSION.CREATE}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching sessions:", error);
        throw error.response?.data || error.message;
    }
};

export default GETsessions;
