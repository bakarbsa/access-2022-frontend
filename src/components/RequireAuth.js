import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';

function RequireAuth({ allowedRoles }) {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!auth.accessToken) {
      setAuth({
        accessToken: localStorage.getItem('accessToken'),
        user: localStorage.getItem('user'),
        roles: [localStorage.getItem('roles')],
        id: localStorage.getItem('id'),
      });
    }
  }, [auth.accessToken]);

  return (
    auth.accessToken
      ? auth?.roles?.find((role) => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.user
          ? <Navigate to="/unauthorized" state={{ from: location }} replace />
          : <Navigate to="/login" state={{ from: location }} replace />
      : !localStorage.getItem('accessToken')
        ? <Navigate to="/login" state={{ from: location }} replace />
        : <Loading />
  );
}

export default RequireAuth;
