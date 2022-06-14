import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireAuth({ allowedRoles }) {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  return (
    auth.accessToken !== undefined
      ? auth?.roles?.find((role) => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.user
          ? <Navigate to="/unauthorized" state={{ from: location }} replace />
          : <Navigate to="/login" state={{ from: location }} replace />
      : sessionStorage.getItem('accessToken') === undefined
        ? <Navigate to="/login" state={{ from: location }} replace />
        : setAuth({
          accessToken: sessionStorage.getItem('accessToken'),
          user: sessionStorage.getItem('user'),
          roles: [sessionStorage.getItem('roles')],
        })
  );
}

export default RequireAuth;
