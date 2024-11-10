import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const PublicRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return accessToken ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
