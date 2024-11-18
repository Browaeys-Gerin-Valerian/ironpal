import { Navigate } from 'react-router-dom';
import { useAuthProvider } from '../context/authContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthProvider();

  return user ? children : <Navigate to='/' />;
};
