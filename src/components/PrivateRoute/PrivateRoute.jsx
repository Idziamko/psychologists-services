import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader/Loader';

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isReady } = useAuth();

  if (!isReady) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to="/psychologists" replace />;
};
