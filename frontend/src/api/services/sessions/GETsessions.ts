import { SESSION } from "../../routes/routes.api";
import axios from "axios";

const GETsessions = async (month: number, year: number) => {
    try {
        // Construction de l'URL avec SESSION.CREATE
        const response = await axios.get(`${SESSION.CREATE}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching sessions:", error);
        throw error.response?.data || error.message;
    }
};

export default GETsessions;
