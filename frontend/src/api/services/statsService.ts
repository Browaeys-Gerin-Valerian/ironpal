import axios from '../config/axios.config';

export const getAppStats = async (): Promise<number> => {
  try {
    const response = await axios.get('/resources/stats');
    return response.data
  } catch (error) {
    console.error('Error fetching total sessions:', error);
    return 0;
  }
};

export const getUserSessionsCount = async (): Promise<number> => {
  try {
    const response = await axios.get('/users/sessions/stats');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user session count:', error);
    return 0;
  }
};

export const getUserValidatedSessionsCount = async (): Promise<number> => {
  try {
    const response = await axios.get('/users/sessions/stats');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user validated session count:', error);
    return 0;
  }
};
