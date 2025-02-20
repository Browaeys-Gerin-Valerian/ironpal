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

export const getUserStats = async (userId: number) => {
  try {
    const response = await axios.get(`/users/${userId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user session count:', error);
    return 0;
  }
};
