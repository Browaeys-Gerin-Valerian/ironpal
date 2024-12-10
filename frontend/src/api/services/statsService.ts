import axios from '../config/axios.config';
import { APP, USER_ROUTES } from '../routes/routes.api';

export const getAppStats = async (): Promise<number> => {
  try {
    const response = await axios.get(APP.STAT);
    return response.data
  } catch (error) {
    console.error('Error fetching total sessions:', error);
    return 0;
  }
};

export const getUserSessionsCount = async (): Promise<number> => {
  try {
    const response = await axios.get(USER_ROUTES.SESSION_COUNT);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user session count:', error);
    return 0;
  }
};

export const getUserValidatedSessionsCount = async (): Promise<number> => {
  try {
    const response = await axios.get(USER_ROUTES.VALIDATED_SESSION_COUNT);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user validated session count:', error);
    return 0;
  }
};
