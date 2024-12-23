import axios from "axios";
import { Session } from "../../../interfaces/entities/Session";


const updateSession = async (userId: number, sessionId: number, updatedData: Partial<Session>) => {
  try {
    const response = await axios.put(`/users/${userId}/sessions/${sessionId}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error("Error modifying session:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default updateSession;
