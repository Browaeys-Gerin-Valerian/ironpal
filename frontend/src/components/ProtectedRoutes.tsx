import { Navigate } from 'react-router-dom';
import { useAuthProvider } from '../context/authContext';
import Loader from './Loader';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthProvider();

  if (loading) {
    return <Loader />;
  }

  return user ? children : <Navigate to='/' />;
};
