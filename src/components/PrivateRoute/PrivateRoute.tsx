import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader/Loader';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn, isReady } = useAuth();

  if (!isReady) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to="/psychologists" replace />;
};
