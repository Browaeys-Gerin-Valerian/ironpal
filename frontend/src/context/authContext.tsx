import axios from '../api/config/axios.config';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../interfaces/data/User';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User;
  loading: boolean;
  authenticate: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const authenticate = useCallback(async () => {
    try {
      const response = await axios.get('/auth');
      setUser(response.data);
    } catch (error) {
      setUser({} as User);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      setUser(response.data.user);
      return response;
    } catch (error) {
      setUser({} as User);
      return error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.get('/auth/logout');
      setUser({} as User);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, authenticate, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
