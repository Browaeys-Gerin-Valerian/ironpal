import axios from '../config/axios.config';

export const getTotalSessions = async (): Promise<number> => {
  try {
    const response = await axios.get('/session/count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching total sessions:', error);
    return 0;
  }
};

export const getTotalExercises = async (): Promise<number> => {
  try {
    const response = await axios.get('/sessionExercise/count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching total exercises:', error);
    return 0;
  }
};

export const getTotalUsers = async (): Promise<number> => {
  try {
    const response = await axios.get('/auth/count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching total users:', error);
    return 0;
  }
};

export const getUserSessionsCount = async (): Promise<number> => {
  try {
    const response = await axios.get('/session/user/count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user session count:', error);
    return 0;
  }
};

export const getUserValidatedSessionsCount = async (): Promise<number> => {
  try {
    const response = await axios.get('/session/user/validated/count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user validated session count:', error);
    return 0;
  }
};
