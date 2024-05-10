import { Outlet, Navigate } from 'react-router-dom';
import { isUserAuthenticated } from '@/utils';

export const ProtectedRoute = () => {
  const isAuthenticated = isUserAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
};
