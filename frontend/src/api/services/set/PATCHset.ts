import { SetExercise } from '../../../interfaces/data/set/Set';
import { SET } from '../../routes/routes.api';
import axios from 'axios';

export const PATCHset = async (
  id: number,
  udpatedSet: Partial<SetExercise>
) => {
  try {
    const response = await axios.patch(`${SET.PATCH}/${id}`, udpatedSet);
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
