import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './views/admin/AdminDashboard';
import Layout from './views/Layout';
import Login from './views/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
