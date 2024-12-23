import { SetExercise } from '../../../interfaces/data/set/Set';
import axios from 'axios';

export const PATCHset = async (
  setId: number,
  payload: Partial<SetExercise>
) => {
  try {
    const response = await axios.patch(`/sets/${setId}`, payload);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error modifying session:',
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export default PATCHset;
