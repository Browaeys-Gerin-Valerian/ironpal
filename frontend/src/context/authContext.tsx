import axios from '../api/config/axios.config';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../interfaces/user';
import { AUTH_ROUTES, USER_ROUTES } from '../api/routes/routes.api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  authenticate: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const authenticate = useCallback(async () => {
    try {
      const response = await axios.get(USER_ROUTES.USER);
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(AUTH_ROUTES.LOGIN, credentials);
      setUser(response.data.user);
      return response;
    } catch (error) {
      setUser(null);
      return error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.get(AUTH_ROUTES.LOGOUT);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
