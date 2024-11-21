import { SESSION } from "../../routes/routes.api";
import axios from "axios";

interface CREATEsession {
  title: string;
  session_date: string;
}

const CREATEsession = async (credentials: CREATEsession) => {
  try {
    const response = await axios.post(SESSION.CREATE, credentials);
    return response.data;
  } catch (error: any) {
    console.error("Error creating session:", error);
    throw error.response?.data || error.message;
  }
};

export default CREATEsession;
