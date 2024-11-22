import { SESSION } from "../../routes/routes.api";
import axios from "axios";

const PUTsession = async (sessionId: string, updatedData: Record<string, any>) => {
  try {
    const response = await axios.put(`${SESSION.PUT}/${sessionId}/user`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error("Error modifying session:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default PUTsession;
