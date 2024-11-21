import axios from "axios";
import { EXERCISE } from "../../routes/routes.api";

const GETexercises = async () => {
  try {
    const response = await axios.get(`${EXERCISE.GET}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching exercise:", error);
    throw error.response?.data || error.message;
  }
};

export default GETexercises;