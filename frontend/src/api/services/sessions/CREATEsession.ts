import axios from "axios";

interface CreateSession {
  title: string;
  session_date: string;
}

const CREATEsession = async (userId: number, payload: CreateSession) => {
  try {
    const response = await axios.post(`/users/${userId}/sessions`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Error creating session:", error);
    throw error.response?.data || error.message;
  }
};

export default CREATEsession;
