export const AUTH_ROUTES = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  USER: '/auth/user',
};

export const USER_ROUTES = {
  USER: '/user',
  SESSION_COUNT: '/user/count',
  VALIDATED_SESSION_COUNT: 'user/validated/count',
  TODAY_SESSION: '/user/today'
}

export const SESSION = {
  CREATE: '/session/user',
  GET: '/session',
  PUT: '/session',
  DELETE: '/session',
};

export const SESSION_EXERCISE = {
  CREATE: '/sessionExercise',
  UPDATE: '/sessionExercise',
  DELETE: '/sessionExercise',
};

export const EXERCISE = {
  GET: '/exercise',
};

export const SET = {
  PATCH: '/set',
};

export const APP = {
  STAT: '/statistics'
}