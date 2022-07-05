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
        accessToken: sessionStorage.getItem('accessToken'),
        user: sessionStorage.getItem('user'),
        roles: [sessionStorage.getItem('roles')],
        id: sessionStorage.getItem('id'),
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
      : !sessionStorage.getItem('accessToken')
        ? <Navigate to="/login" state={{ from: location }} replace />
        : <Loading />
  );
}

export default RequireAuth;
