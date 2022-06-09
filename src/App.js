import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './views/admin/AdminDashboard';
import Layout from './views/Layout';
import Login from './views/Login';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['user']} />}>
          <Route path="user" element={<Unauthorized />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
