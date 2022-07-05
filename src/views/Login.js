import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import bg from '../assets/login-bg-web.jpg';
import decor from '../assets/login-decor.png';
import logo from '../assets/logo.png';
import b201 from '../assets/b201-logo.png';
import API_URL from '../api';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  function from(role) {
    if (role === 'admin') return '/admin';
    if (role === 'user') return '/dashboard';
    return location.state?.from?.pathname || '/';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/auth`,
        JSON.stringify(formData),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const accessToken = response?.data?.data.token;
      const roles = [response?.data?.data.role];
      setAuth({
        user: formData.username, roles, accessToken,
      });
      sessionStorage.setItem('user', formData.username);
      sessionStorage.setItem('roles', roles[0]);
      sessionStorage.setItem('accessToken', accessToken);
      setFormData('');
      navigate(from(roles[0]), { replace: true });
    } catch (err) {
      console.log(err);
      console.log('gagal login');
    }
  };

  const renderByRole = () => {
    const role = auth.roles || sessionStorage.getItem('roles') || '';
    if (role === 'user') {
      return (<Navigate to="/dashboard" />);
    }
    if (role === 'admin') {
      return (<Navigate to="/admin" />);
    }
    return (
      <div>
        <div className="w-screen h-screen overflow-hidden absolute">
          <img src={bg} className="h-full w-full" alt="access background" />
        </div>
        <div className="w-full h-screen">
          <div className="fixed flex justify-between h-full w-full z-10">
            <img src={decor} className="h-full md:block hidden" alt="login-decor" />
            <div className="xl:w-1/3 lg:w-2/4 md:w-3/6 w-full md:rounded-tl-4xl px-14 pt-10 flex flex-col justify-between items-center bg-access-white">
              <img src={logo} alt="access logo" />
              <div className="w-full flex flex-col gap-6 items-center">
                <h2 className="text-xl text-access-dark font-bold">Silahkan login</h2>
                <form method="post" onSubmit={handleSubmit} className="w-full flex flex-col gap-10 mb-5">
                  <div className="flex gap-4">
                    <UserCircleIcon className="w-10 text-access-dark" />
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full pb-1 bg-access-white border-b-2 border-access-dark focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-4">
                    <LockClosedIcon className="w-10 text-access-dark" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      name={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pb-1 bg-access-white border-b-2 border-access-dark focus:outline-none"
                    />
                  </div>
                </form>
                <Button onClick={handleSubmit} content="Masuk" />
              </div>
              <div>
                <h1>Powered by</h1>
                <img src={b201} alt="b201 logo" className="w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    renderByRole()
  );
}

export default Login;
