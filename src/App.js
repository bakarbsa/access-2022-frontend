import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './views/admin/AdminDashboard';
import Layout from './views/Layout';
import Login from './views/Login';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import UserDashboard from './views/user/UserDashboard';
import OlimRoom from './components/users/OlimRoom';
import { SideNavProvider } from './context/admin/SideNavProvider';
import { OverlayProvider } from './context/admin/OverlayProvider';
import useAuth from './hooks/useAuth';

function App() {
  const { auth } = useAuth();

  axios.interceptors.request.use(
    (req) => {
      const token = auth.accessToken || localStorage.getItem('accessToken');
      req.headers.Authorization = `Bearer ${token}`;

      return req;
    },
    (err) => Promise.reject(err),
  );
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route
            path="admin"
            element={(
              <SideNavProvider>
                <OverlayProvider>
                  <AdminDashboard />
                </OverlayProvider>
              </SideNavProvider>
            )}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={['user']} />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="olim" element={<OlimRoom />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
