/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import logo from '../assets/logo.png';
import oase from '../assets/oase-logo.png';
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
      const id = response?.data?.data.id;
      const name = response?.data?.data.name;
      setAuth({
        user: formData.username, roles, accessToken, name,
      });
      localStorage.setItem('user', formData.username);
      localStorage.setItem('roles', roles[0]);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('id', id);
      localStorage.setItem('name', name);
      setFormData('');
      navigate(from(roles[0]), { replace: true });
    } catch (err) {
      console.log(err);
      console.log('gagal login');
    }
  };

  const renderByRole = () => {
    const role = auth.roles || localStorage.getItem('roles') || '';
    if (role === 'user') {
      return (<Navigate to="/dashboard" />);
    }
    if (role === 'admin') {
      return (<Navigate to="/admin" />);
    }
    return (
      <div className="h-screen bg-gray-200 flex justify-center items-center">
        <div className=" bg-access-white shadow-xl rounded-md py-8 px-10 w-96 flex flex-col justify-center items-center">
          <img src={logo} alt="logo access" width="120px" />
          <div className="w-full flex flex-col gap-6 mt-2 items-center">
            <h2 className="text-xl text-access-dark font-bold">Silahkan masuk</h2>
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
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-sm">Powered by</h1>
              <a href="https://www.instagram.com/oasetechnology" target="_blank" rel="noreferrer">
                <img src={oase} alt="oase logo" className="w-[70px] mt-2" />
              </a>
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
